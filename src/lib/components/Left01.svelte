<!-- src/lib/components/Left01.svelte -->
<script lang="ts">
  import { ChevronRight, ChevronDown, FileText, Folder } from 'lucide-svelte';

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

<div class="fixed left-14 top-0 h-screen w-60 bg-white border-r border-gray-200 p-3 overflow-y-auto z-40">
  <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2 px-1">Documents</h3>

  {#each tree as item, i}
    <div class="mb-0.5">
      {#if item.type === 'folder'}
        <button
          type="button"
          class="flex items-center w-full text-left p-1.5 hover:bg-gray-100 focus:outline-none text-sm"
          on:click={() => toggleFolder(i)}
        >
          {#if item.expanded}
            <ChevronDown class="w-3.5 h-3.5 mr-1 flex-shrink-0 text-gray-500" />
          {:else}
            <ChevronRight class="w-3.5 h-3.5 mr-1 flex-shrink-0 text-gray-500" />
          {/if}
          <Folder class="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
          <span class="truncate">{item.name}</span>
        </button>

        {#if item.expanded}
          <div class="ml-6 mt-0.5 space-y-0.5">
            {#each item.children as child}
              <button
                type="button"
                class="flex items-center w-full text-left p-1 hover:bg-gray-100 focus:outline-none text-xs text-gray-700"
              >
                <FileText class="w-3.5 h-3.5 mr-2 text-gray-500 flex-shrink-0" />
                <span class="truncate">{child.name}</span>
              </button>
            {/each}
          </div>
        {/if}
      {/if}
    </div>
  {/each}
</div>