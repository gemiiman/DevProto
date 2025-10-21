<!-- src/lib/components/Left01.svelte -->
<script lang="ts">
  import { ChevronRight, ChevronDown, FileText, Folder, X } from 'lucide-svelte';
  import { isLeft01Open } from '$lib/stores/layout';

  // Pinned items
  let pinned = [
    { name: 'README.md', type: 'file' },
    { name: 'Graph', type: 'file' }
  ];

  // Mock folder tree — replace with Drizzle/SQLite later
  let tree = [
    {
      name: 'Discovery',
      type: 'folder',
      expanded: true,
      children: [
        { name: 'Target Validation Report.pdf', type: 'file' },
        { name: 'Lead Compound Summary.docx', type: 'file' }
      ]
    },
    {
      name: 'Preclinical',
      type: 'folder',
      expanded: false,
      children: [
        { name: 'Tox Study Q3 2025.xlsx', type: 'file' }
      ]
    },
    {
      name: 'Regulatory Submissions',
      type: 'folder',
      expanded: false,
      children: []
    }
  ];

  function toggleFolder(index: number): void {
    tree[index].expanded = !tree[index].expanded;
  }
</script>

<style>
  .file-item:hover {
    background-color: rgba(0, 0, 0, 0.04) !important;
  }
</style>

<div class="h-full w-full bg-white flex flex-col" style="border: none; border-right: 1px solid #333333;">
  <!-- Header: plain text on background, no box -->
  <div class="flex items-center justify-between px-3 py-2.5 shrink-0" style="background-color: transparent;">
    <div class="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Files</div>
    <button 
      class="text-gray-400 hover:text-gray-600 transition-colors"
      style="background-color: transparent; border: none;"
      on:click={() => isLeft01Open.set(false)}
      aria-label="Close panel"
    >
      <X class="w-[10px] h-[10px]" />
    </button>
  </div>

  <!-- Scrollable file tree with single uniform background -->
  <div class="overflow-y-auto grow">
    <!-- PINNED Section -->
    <div class="pt-2 pb-3">
      <div class="px-3 py-1.5 text-[8px] font-semibold uppercase tracking-wider text-gray-400">
        Pinned
      </div>
      {#each pinned as item}
        <button
          type="button"
          class="flex items-center w-full text-left px-3 py-1 text-[11px] text-gray-600 file-item"
          style="background-color: transparent; border: none;"
        >
          <FileText class="w-[14px] h-[14px] mr-2.5 text-gray-400 flex-shrink-0" stroke-width="1.5" />
          <span class="truncate">{item.name}</span>
        </button>
      {/each}
    </div>

    <!-- File Tree: flat list, no cards or bubbles -->
    <div class="pt-1">
      {#each tree as item, i}
        {#if item.type === 'folder'}
          <!-- Folder row: plain text, transparent background -->
          <button
            type="button"
            class="flex items-center w-full text-left px-3 py-1 text-[11px] text-gray-600 file-item"
            style="background-color: transparent; border: none;"
            on:click={() => toggleFolder(i)}
          >
            {#if item.expanded}
              <ChevronDown class="w-[12px] h-[12px] mr-1 flex-shrink-0 text-gray-500" stroke-width="1.5" />
            {:else}
              <ChevronRight class="w-[12px] h-[12px] mr-1 flex-shrink-0 text-gray-500" stroke-width="1.5" />
            {/if}
            <Folder class="w-[14px] h-[14px] mr-2.5 text-gray-500 flex-shrink-0" stroke-width="1.5" />
            <span class="truncate">{item.name}</span>
          </button>

          <!-- Nested files: plain text, transparent background, indented -->
          {#if item.expanded}
            {#each item.children as child}
              <button
                type="button"
                class="flex items-center w-full text-left pl-8 pr-3 py-1 text-[11px] text-gray-600 file-item"
                style="background-color: transparent; border: none;"
              >
                <FileText class="w-[14px] h-[14px] mr-2.5 text-gray-400 flex-shrink-0" stroke-width="1.5" />
                <span class="truncate">{child.name}</span>
              </button>
            {/each}
          {/if}
        {/if}
      {/each}
    </div>
  </div>
</div>