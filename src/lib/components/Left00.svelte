<!-- src/lib/components/Left00.svelte -->
<script lang="ts">
  import { Menu, Folder, Search, Terminal, Settings } from 'lucide-svelte';
  import { showFinder, showCommandPalette, isTerminalOpen, openGraphTab, openTemplateTab } from '$lib/stores/layout';
</script>

<style>
  .icon-button:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
</style>

<div class="h-full w-14 bg-gray-900 flex flex-col items-center py-2 shrink-0" style="border: none; border-right: 1px solid #333333;">
  <button 
    class="w-full h-10 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors icon-button" 
    style="background-color: transparent; border: none;"
    on:click={() => showFinder.set(true)}
  >
    <Menu class="w-5 h-5" stroke-width="1.5" />
  </button>
  <button 
    class="w-full h-10 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors icon-button" 
    style="background-color: transparent; border: none;"
    on:click={() => openGraphTab()}
  >
    <Folder class="w-5 h-5" stroke-width="1.5" />
  </button>
  <button 
    class="w-full h-10 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors icon-button" 
    style="background-color: transparent; border: none;"
    on:click={() => openTemplateTab()}
  >
    <Search class="w-5 h-5" stroke-width="1.5" />
  </button>
  <button 
    class="w-full h-10 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors icon-button" 
    style="background-color: transparent; border: none;"
    on:click={() => isTerminalOpen.update(v => !v)}
  >
    <Terminal class="w-5 h-5" stroke-width="1.5" />
  </button>
  <button 
    class="w-full h-10 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors icon-button" 
    style="background-color: transparent; border: none;"
    on:click={() => showCommandPalette.set(true)}
  >
    <Settings class="w-5 h-5" stroke-width="1.5" />
  </button>
</div>