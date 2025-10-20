<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import Left00 from '$lib/components/Left00.svelte';
  import Left01 from '$lib/components/Left01.svelte';
  import { isLeft01Open } from '$lib/stores/layout';
</script>

<!-- Fixed global action rail — outside layout flow -->
<Left00 />

<!-- Main app layout: starts AFTER Left00 -->
<div class="flex h-screen w-screen overflow-hidden bg-white ml-14">
  <!-- Collapsible Document Tree -->
  {#if $isLeft01Open}
    <Left01 />
  {/if}

  <!-- Main Workspace -->
  <div class="flex-1 overflow-auto">
    <slot />
  </div>
</div>