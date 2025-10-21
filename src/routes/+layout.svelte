<script lang="ts">
  import '../app.css';
  import Left00 from '$lib/components/Left00.svelte';
  import Left01 from '$lib/components/Left01.svelte';
  import { isLeft01Open, isRight01Open, isTerminalOpen } from '$lib/stores/layout';
  import { X } from 'lucide-svelte';

  // Terminal height management (30% of viewport by default)
  let terminalHeight = 30; // percentage
  let isDragging = false;

  function startDrag(e: MouseEvent) {
    isDragging = true;
    e.preventDefault();
  }

  function handleDrag(e: MouseEvent) {
    if (!isDragging) return;
    const viewportHeight = window.innerHeight;
    const newHeight = ((viewportHeight - e.clientY) / viewportHeight) * 100;
    // Clamp between 10% and 70%
    terminalHeight = Math.max(10, Math.min(70, newHeight));
  }

  function stopDrag() {
    isDragging = false;
  }

  $: if (typeof window !== 'undefined') {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', stopDrag);
    } else {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', stopDrag);
    }
  }
</script>

<!-- Outermost Layout: Horizontal Flex -->
<div class="flex h-screen w-screen overflow-hidden">
  <!-- Column 1: Left00 Static Icon Bar -->
  <Left00 />

  <!-- Column 2: Left01 Collapsible File Panel -->
  <div class="{$isLeft01Open ? 'w-60' : 'w-8'} shrink-0 transition-all duration-200">
    {#if $isLeft01Open}
      <Left01 />
    {:else}
      <button 
        class="h-full w-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
        style="border: none; border-right: 1px solid #333333;"
        on:click={() => isLeft01Open.set(true)}
      >
        <span class="text-gray-500 text-xs [writing-mode:vertical-lr] rotate-180">Files</span>
      </button>
    {/if}
  </div>

  <!-- Column 3: Main Area (Vertical Flex) -->
  <div class="flex flex-col flex-1 overflow-hidden">
    <!-- Top Row: Content Area (Horizontal Flex) -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Middle00: Main Content/Editor Panel -->
      <div class="flex-1 overflow-auto bg-gray-50">
        <slot />
      </div>

      <!-- Right01: Collapsible AI Panel -->
      {#if $isRight01Open}
        <div class="w-60 shrink-0 bg-white p-3 overflow-auto" style="border: none; border-left: 1px solid #333333;">
          <div class="text-xs font-medium text-gray-500 mb-3">Right01</div>
          <div class="h-full bg-gray-50"></div>
        </div>
      {/if}
    </div>

    <!-- Bottom Row: Terminal01 Collapsible Panel -->
    <div 
      class="shrink-0 bg-white flex flex-col"
      style="height: {$isTerminalOpen ? `${terminalHeight}vh` : '24px'}; border: none; border-top: 1px solid #333333; transition: height 0.2s ease;"
    >
      {#if $isTerminalOpen}
        <!-- Draggable resize handle -->
        <div 
          class="w-full h-1 cursor-ns-resize hover:bg-blue-500 transition-colors shrink-0"
          style="border: none;"
          on:mousedown={startDrag}
          on:keydown={(e) => e.key === 'Enter' && e.preventDefault()}
          role="separator"
          aria-orientation="horizontal"
          aria-label="Resize terminal"
          tabindex="0"
        ></div>
        
        <div class="flex items-center justify-between px-3 py-1.5 shrink-0" style="border-bottom: 1px solid #e5e5e5;">
          <div class="flex items-center gap-2">
            <div class="text-xs text-gray-600">Terminal01</div>
            <div class="text-gray-400 text-xs">AI activity log</div>
          </div>
          <button 
            class="text-gray-400 hover:text-gray-600 transition-colors"
            on:click={() => isTerminalOpen.set(false)}
            aria-label="Close terminal"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        </div>
        <div class="p-3 font-mono text-sm text-gray-800 overflow-auto grow">
          <div class="opacity-60">[AI] Cross-referencing context...</div>
        </div>
      {:else}
        <button 
          class="h-full w-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          on:click={() => isTerminalOpen.set(true)}
        >
          <span class="text-gray-500 text-xs">Terminal</span>
        </button>
      {/if}
    </div>
  </div>
</div>