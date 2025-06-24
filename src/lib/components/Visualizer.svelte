<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let audio: HTMLAudioElement;
  let analyser: AnalyserNode;
  let dataArray: Uint8Array;

  onMount(() => {
    // Find the audio element on the page
    audio = document.querySelector('audio')!;
    const ctx = new AudioContext();
    const source = ctx.createMediaElementSource(audio);
    analyser = ctx.createAnalyser();
    source.connect(analyser).connect(ctx.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    function draw() {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      const width = canvas.width;
      const height = canvas.height;
      const barWidth = width / bufferLength;

      const c = canvas.getContext('2d')!;
      c.clearRect(0, 0, width, height);

      dataArray.forEach((value, i) => {
        const barHeight = (value / 255) * height;
        c.fillRect(i * barWidth, height - barHeight, barWidth * 0.8, barHeight);
      });
    }

    draw();
  });
</script>

<canvas bind:this={canvas} class="w-full h-24 bg-black"></canvas>
