<script setup>
const institutions = [
  { name: 'University of Ghana', color: '#F59E0B' },
  { name: 'KNUST', color: '#10B981' },
  { name: 'Ashesi University', color: '#F59E0B' },
  { name: 'Accra Technical University', color: '#10B981' },
  { name: 'Ghana Communication Technology University', color: '#F59E0B' },
]
const looped = [...institutions, ...institutions, ...institutions, ...institutions]
</script>

<template>
  <section class="relative py-20 lg:py-24 overflow-hidden" style="background: #F9FAFB;">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-8">
      <span class="trusted-label">Trusted By</span>
    </div>

    <div class="space-y-6 px-4 sm:px-6 lg:px-8">
      <!-- Belt 1: \\ shape (top arm of < ), scrolls left -->
      <div class="belt-frame relative overflow-hidden">
        <div class="belt-bg relative overflow-hidden skew-bottom-right">
          <div class="belt-skew-wrap skew-bottom-right-inner">
            <div class="absolute inset-0 opacity-[0.04] pointer-events-none" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 24px 24px;" />
            <div class="belt-track">
              <div v-for="(item, i) in looped" :key="'a' + i" class="belt-item" :style="{ '--txt': item.color }">
                <span class="belt-name">{{ item.name }}</span>
                <span class="belt-separator">✦</span>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 left-0 w-24 pointer-events-none" style="background: linear-gradient(to right, #ffffff, transparent); z-index: 2;" />
          <div class="absolute inset-y-0 right-0 w-24 pointer-events-none" style="background: linear-gradient(to left, #ffffff, transparent); z-index: 2;" />
        </div>
      </div>

      <!-- Belt 2: / shape (bottom arm of < ), scrolls right -->
      <div class="belt-frame relative overflow-hidden">
        <div class="belt-bg relative overflow-hidden skew-top-right">
          <div class="belt-skew-wrap skew-top-right-inner">
            <div class="absolute inset-0 opacity-[0.04] pointer-events-none" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 24px 24px;" />
            <div class="belt-track belt-track-reverse">
              <div v-for="(item, i) in looped" :key="'b' + i" class="belt-item" :style="{ '--txt': item.color }">
                <span class="belt-name">{{ item.name }}</span>
                <span class="belt-separator">✦</span>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 left-0 w-24 pointer-events-none" style="background: linear-gradient(to right, #ffffff, transparent); z-index: 2;" />
          <div class="absolute inset-y-0 right-0 w-24 pointer-events-none" style="background: linear-gradient(to left, #ffffff, transparent); z-index: 2;" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.belt-frame {
  border-radius: 24px;
  padding: 0;
}

.belt-bg {
  background: #ffffff;
  border-radius: 24px;
  padding: 0;
}

.skew-top-right {
  transform: skewX(-3deg);
}
.skew-top-right-inner {
  transform: skewX(3deg);
}
.skew-bottom-right {
  transform: skewX(3deg);
}
.skew-bottom-right-inner {
  transform: skewX(-3deg);
}

.belt-skew-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}

.belt-track {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 20px 0;
  animation: scroll-belt 40s linear infinite;
  white-space: nowrap;
}

.belt-track-reverse {
  animation: scroll-belt-reverse 40s linear infinite;
}

.belt-frame:hover .belt-track,
.belt-frame:hover .belt-track-reverse {
  animation-play-state: paused;
}

@keyframes scroll-belt {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scroll-belt-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.belt-item {
  display: inline-flex;
  align-items: center;
  gap: 0;
  padding: 0 40px;
  transition: all 300ms ease;
  cursor: default;
}

.belt-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--txt);
  letter-spacing: 0.02em;
  transition: all 300ms ease;
  white-space: nowrap;
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.04);
}

.belt-item:hover .belt-name {
  filter: brightness(1.25) drop-shadow(0 0 10px var(--txt));
}

.belt-separator {
  display: inline-block;
  margin-left: 32px;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.12);
}

.trusted-label {
  position: relative;
  display: inline-block;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #8B5CF6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: 0 8px;
}
.trusted-label::before,
.trusted-label::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, #3B82F6, transparent);
}
.trusted-label::before { top: -8px; }
.trusted-label::after { bottom: -8px; }
</style>
