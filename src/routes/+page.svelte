<script lang="ts">
  import { tabs, activeTabId, type Tab, showFinder, showCommandPalette } from '$lib/stores/layout';
  import { get } from 'svelte/store';

  function activate(id: string) {
    activeTabId.set(id);
  }
  function closeTab(id: string) {
    tabs.update((list) => list.filter((t) => t.id !== id));
    const current = get(activeTabId);
    if (current === id) {
      const list = get(tabs);
      activeTabId.set(list.length ? list[list.length - 1].id : null);
    }
  }
</script>

<!-- Middle00: Tab strip -->
<div class="h-full flex flex-col">
  <div class="bg-white flex flex-col flex-1 overflow-hidden">
    <div class="flex items-center gap-1 px-3 py-1.5 overflow-x-auto shrink-0" style="border-bottom: 1px solid #e5e5e5;">
      {#if $tabs.length === 0}
        <div class="text-xs text-gray-500">No tabs — use Finder, Graph, or Templates to open one.</div>
      {/if}
      {#each $tabs as t}
        <div class="flex items-center gap-1 px-2 py-1 text-xs cursor-pointer {($activeTabId === t.id) ? 'text-gray-700' : 'text-gray-500 hover:text-gray-700'}" on:click={() => activate(t.id)}>
          <span>{t.title}</span>
          <button class="ml-1 text-gray-400 hover:text-gray-600" on:click|stopPropagation={() => closeTab(t.id)}>×</button>
        </div>
      {/each}
    </div>

    <!-- Middle00: Content area -->
    <div class="p-3 flex-1 overflow-auto bg-gray-50">
      {#if !$activeTabId}
        <div class="h-[50vh] grid place-items-center text-center text-gray-500">
          <div>
            <div class="text-lg font-semibold mb-1">Welcome</div>
            <div class="text-sm">Open the Finder, Graph View, or Templates from the left toolbar to get started.</div>
          </div>
        </div>
      {:else}
        {#key $activeTabId}
          {#each $tabs as t}
            {#if t.id === $activeTabId}
              {#if t.kind === 'graph'}
                <div class="h-[50vh] grid place-items-center text-gray-700">[Graph View Placeholder]</div>
              {:else if t.kind === 'template'}
                <div class="space-y-2">
                  <div class="text-sm text-gray-600">Templates</div>
                  <ul class="list-disc pl-6 text-sm text-gray-800">
                    <li>IND Summary</li>
                    <li>Clinical Study Report</li>
                    <li>eCTD Module 2 Overview</li>
                  </ul>
                </div>
              {:else}
                <textarea class="w-full h-[50vh] resize-none border border-gray-300 rounded p-2 font-mono text-sm" placeholder="Start typing..." />
              {/if}
            {/if}
          {/each}
        {/key}
      {/if}
    </div>
  </div>
</div>

<!-- Finder Modal -->
{#if $showFinder}
  <div class="fixed inset-0 z-50 grid place-items-center">
    <div class="absolute inset-0 bg-black/40" on:click={() => showFinder.set(false)}></div>
    <div class="relative w-full max-w-xl rounded border border-gray-300 bg-white shadow-lg">
      <div class="px-3 py-2 border-b border-gray-200 text-sm font-medium">Finder</div>
      <div class="p-3">
        <input class="w-full border border-gray-300 rounded px-2 py-1 text-sm" placeholder="Type to search files or commands..." />
      </div>
    </div>
  </div>
{/if}

<!-- Command Palette Modal -->
{#if $showCommandPalette}
  <div class="fixed inset-0 z-50 grid place-items-center">
    <div class="absolute inset-0 bg-black/40" on:click={() => showCommandPalette.set(false)}></div>
    <div class="relative w-full max-w-lg rounded border border-gray-300 bg-white shadow-lg">
      <div class="px-3 py-2 border-b border-gray-200 text-sm font-medium">Command Palette</div>
      <div class="p-3 text-sm text-gray-700">
        <div>Configure shortcuts and commands (placeholder)</div>
      </div>
    </div>
  </div>
{/if}
