<!-- src/lib/components/Left00.svelte -->
<script lang="ts">
  import { Menu, Folder, Search, Terminal, Settings } from 'lucide-svelte';
</script>

<div class="fixed left-0 top-0 h-screen w-14 bg-gray-900 border-r border-gray-700 flex flex-col items-center py-2 z-50">
  <button class="w-full h-10 flex items-center justify-center hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
    <Menu class="w-5 h-5" />
  </button>
  <button class="w-full h-10 flex items-center justify-center hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
    <Folder class="w-5 h-5" />
  </button>
  <button class="w-full h-10 flex items-center justify-center hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
    <Search class="w-5 h-5" />
  </button>
  <button class="w-full h-10 flex items-center justify-center hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
    <Terminal class="w-5 h-5" />
  </button>
  <button class="w-full h-10 flex items-center justify-center hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
    <Settings class="w-5 h-5" />
  </button>
</div>