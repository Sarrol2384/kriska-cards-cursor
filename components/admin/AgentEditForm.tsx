"use client";

import { useState } from "react";
import Link from "next/link";
import type { DbAgent, DbProperty } from "@/lib/agents-db";
import type { ListingType } from "@/content/types";
import { agentPhotoUrl, propertyPhotoUrl } from "@/lib/storage";
import { BUCKET_AGENT, BUCKET_PROPERTY } from "@/lib/storage";

async function uploadFile(bucket: string, path: string, file: File) {
  const form = new FormData();
  form.append("file", file);
  form.append("bucket", bucket);
  form.append("path", path);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Upload failed");
  return json.path as string;
}

export function AgentEditForm({
  agent,
  properties: initialProperties,
  isNew,
}: {
  agent: DbAgent;
  properties: DbProperty[];
  isNew?: boolean;
}) {
  const [form, setForm] = useState(agent);
  const [properties, setProperties] = useState(initialProperties);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function updateField<K extends keyof DbAgent>(key: K, value: DbAgent[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function saveAgent() {
    setSaving(true);
    setMessage(null);
    const res = await fetch(`/api/admin/agents/${form.slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (!res.ok) {
      const j = await res.json();
      setMessage(j.error ?? "Save failed");
      return;
    }
    setMessage("Profile saved.");
  }

  async function onAgentPhoto(file: File) {
    const path = `${form.slug}/agent.jpeg`;
    await uploadFile(BUCKET_AGENT, path, file);
    updateField("photo_path", path);
    await saveAgent();
  }

  async function saveProperty(p: DbProperty) {
    const res = await fetch("/api/admin/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    if (!res.ok) {
      const j = await res.json();
      setMessage(j.error ?? "Property save failed");
      return;
    }
    const saved = (await res.json()) as DbProperty;
    setProperties((list) => {
      const idx = list.findIndex((x) => x.id === saved.id);
      if (idx >= 0) {
        const next = [...list];
        next[idx] = saved;
        return next;
      }
      return [...list, saved];
    });
    setMessage("Listing saved.");
  }

  async function removeProperty(id: string) {
    const res = await fetch(
      `/api/admin/properties?id=${id}&agent_slug=${form.slug}`,
      { method: "DELETE" },
    );
    if (!res.ok) {
      setMessage("Delete failed");
      return;
    }
    setProperties((list) => list.filter((p) => p.id !== id));
  }

  function addProperty(type: ListingType) {
    const temp: DbProperty = {
      id: `new-${Date.now()}`,
      agent_slug: form.slug,
      listing_type: type,
      title: "",
      suburb: "",
      image_path: null,
      sort_order: properties.length,
    };
    setProperties((list) => [...list, temp]);
  }

  function updatePropertyLocal(id: string, patch: Partial<DbProperty>) {
    setProperties((list) =>
      list.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    );
  }

  async function onPropertyPhoto(p: DbProperty, file: File) {
    const isNewId = p.id.startsWith("new-");
    let prop = p;
    if (isNewId) {
      const res = await fetch("/api/admin/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_slug: p.agent_slug,
          listing_type: p.listing_type,
          title: p.title || "Listing",
          suburb: p.suburb || "TBC",
          sort_order: p.sort_order,
        }),
      });
      if (!res.ok) return;
      prop = (await res.json()) as DbProperty;
      setProperties((list) =>
        list.map((x) => (x.id === p.id ? prop : x)),
      );
    }
    const path = `${form.slug}/properties/${prop.id}.jpg`;
    await uploadFile(BUCKET_PROPERTY, path, file);
    const updated = { ...prop, image_path: path };
    await saveProperty(updated);
  }

  const sold = properties.filter((p) => p.listing_type === "sold");
  const available = properties.filter((p) => p.listing_type === "available");

  return (
    <div className="space-y-8">
      {message && (
        <p className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
          {message}
        </p>
      )}

      <section className="space-y-4 rounded-xl border border-primary/25 bg-[#111] p-4">
        <h2 className="font-heading text-lg text-primary">Profile</h2>
        {isNew && (
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">URL slug</label>
            <input
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              className="w-full rounded-lg border border-primary/30 bg-[#0a0a0a] px-3 py-2 text-sm"
              placeholder="nomonde-blandile"
            />
          </div>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Full name" value={form.agent_name} onChange={(v) => updateField("agent_name", v)} />
          <Field label="Phone" value={form.phone} onChange={(v) => updateField("phone", v)} />
          <Field label="Email" value={form.email} onChange={(v) => updateField("email", v)} />
          <Field label="Role" value={form.role} onChange={(v) => updateField("role", v)} />
          <Field label="Tagline" value={form.tagline} onChange={(v) => updateField("tagline", v)} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Bio</label>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            className="w-full rounded-lg border border-primary/30 bg-[#0a0a0a] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Headshot</label>
          {form.photo_path && agentPhotoUrl(form.photo_path) && (
            <img
              src={agentPhotoUrl(form.photo_path)!}
              alt=""
              className="mb-2 size-24 rounded-full object-cover"
            />
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onAgentPhoto(f);
            }}
          />
        </div>
        <button
          type="button"
          disabled={saving}
          onClick={() => void saveAgent()}
          className="btn-gold rounded-full px-6 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save profile"}
        </button>
        {!isNew && (
          <Link href={`/${form.slug}`} target="_blank" className="ml-4 text-sm text-primary hover:underline">
            Preview card
          </Link>
        )}
      </section>

      <PropertySection
        title="Sold properties"
        items={sold}
        onAdd={() => addProperty("sold")}
        onSave={(p) => void saveProperty(p)}
        onDelete={(id) => void removeProperty(id)}
        onChange={updatePropertyLocal}
        onPhoto={onPropertyPhoto}
      />

      <PropertySection
        title="Available properties"
        items={available}
        onAdd={() => addProperty("available")}
        onSave={(p) => void saveProperty(p)}
        onDelete={(id) => void removeProperty(id)}
        onChange={updatePropertyLocal}
        onPhoto={onPropertyPhoto}
      />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-primary/30 bg-[#0a0a0a] px-3 py-2 text-sm"
      />
    </div>
  );
}

function PropertySection({
  title,
  items,
  onAdd,
  onSave,
  onDelete,
  onChange,
  onPhoto,
}: {
  title: string;
  items: DbProperty[];
  onAdd: () => void;
  onSave: (p: DbProperty) => void;
  onDelete: (id: string) => void;
  onChange: (id: string, patch: Partial<DbProperty>) => void;
  onPhoto: (p: DbProperty, file: File) => void;
}) {
  return (
    <section className="space-y-3 rounded-xl border border-primary/25 bg-[#111] p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg text-primary">{title}</h2>
        <button type="button" onClick={onAdd} className="text-sm text-primary hover:underline">
          + Add
        </button>
      </div>
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">No listings yet.</p>
      )}
      {items.map((p) => (
        <div key={p.id} className="space-y-2 rounded-lg border border-primary/15 bg-[#0a0a0a] p-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              placeholder="Title"
              value={p.title}
              onChange={(e) => onChange(p.id, { title: e.target.value })}
              className="rounded border border-primary/20 bg-[#111] px-2 py-1.5 text-sm"
            />
            <input
              placeholder="Suburb"
              value={p.suburb}
              onChange={(e) => onChange(p.id, { suburb: e.target.value })}
              className="rounded border border-primary/20 bg-[#111] px-2 py-1.5 text-sm"
            />
          </div>
          {p.image_path && propertyPhotoUrl(p.image_path) && (
            <img
              src={propertyPhotoUrl(p.image_path)!}
              alt=""
              className="h-20 w-28 rounded object-cover"
            />
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onPhoto(p, f);
            }}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onSave(p)}
              className="text-sm text-primary hover:underline"
            >
              Save listing
            </button>
            {!p.id.startsWith("new-") && (
              <button
                type="button"
                onClick={() => onDelete(p.id)}
                className="text-sm text-accent hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
