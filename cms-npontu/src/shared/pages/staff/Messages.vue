<script setup>
import { ref } from 'vue'

const activeChat = ref(null)

const conversations = [
  { id: 1, name: 'Prof. Asare (HOD)', role: 'Staff', lastMessage: 'Please review the departmental meeting minutes.', time: '2h ago', unread: 1 },
  { id: 2, name: 'Kwame Asante', role: 'Student', lastMessage: 'Thank you, sir. I understand now.', time: '5h ago', unread: 0 },
  { id: 3, name: 'Academic Registry', role: 'System', lastMessage: 'Deadline for mid-sem grades submission is approaching.', time: '1d ago', unread: 0 },
  { id: 4, name: 'Abena Mensah', role: 'Student', lastMessage: 'Could we schedule a consultation?', time: '2d ago', unread: 0 },
]

const messages = [
  { id: 1, sender: 'other', text: 'Good morning Dr. Baah. I had a question regarding the first assignment.', time: '09:15 AM' },
  { id: 2, sender: 'me', text: 'Good morning Kwame. What is your question?', time: '09:30 AM' },
  { id: 3, sender: 'other', text: 'Are we supposed to implement the sorting algorithm from scratch or can we use the built-in library?', time: '09:35 AM' },
  { id: 4, sender: 'me', text: 'For this assignment, you must implement it from scratch to demonstrate your understanding of the underlying mechanics.', time: '09:45 AM' },
  { id: 5, sender: 'other', text: 'Thank you, sir. I understand now.', time: '09:50 AM' },
]

const selectChat = (c) => {
  activeChat.value = c
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10 h-[calc(100vh-80px)] flex flex-col">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
      <div>
        <h1 class="text-2xl font-bold text-text mb-1">Messages</h1>
        <p class="text-muted font-medium">Communicate with students and colleagues.</p>
      </div>
      <button class="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-panel transition-all">
        New Message
      </button>
    </div>

    <div class="card-soft flex-1 flex overflow-hidden min-h-[500px]">
      
      <!-- Contacts List -->
      <div class="w-1/3 border-r border-border bg-page flex flex-col">
        <div class="p-4 border-b border-border bg-surface shrink-0">
          <input type="text" placeholder="Search conversations..." class="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary shadow-sm">
        </div>
        <div class="flex-1 overflow-y-auto divide-y divide-border">
          <div v-for="conv in conversations" :key="conv.id" 
               @click="selectChat(conv)"
               class="p-4 hover:bg-white transition-colors cursor-pointer"
               :class="activeChat?.id === conv.id ? 'bg-white border-l-4 border-l-primary' : 'border-l-4 border-transparent'">
            <div class="flex items-center justify-between mb-1">
              <p class="font-bold text-text truncate pr-2">{{ conv.name }}</p>
              <p class="text-xs font-semibold text-muted shrink-0">{{ conv.time }}</p>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-sm text-muted truncate pr-4" :class="{'font-bold text-text': conv.unread > 0}">{{ conv.lastMessage }}</p>
              <span v-if="conv.unread > 0" class="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0">{{ conv.unread }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="flex-1 flex flex-col bg-white">
        <template v-if="activeChat">
          <!-- Chat Header -->
          <div class="p-4 border-b border-border flex items-center justify-between bg-surface shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {{ activeChat.name.charAt(0) }}
              </div>
              <div>
                <p class="font-bold text-text">{{ activeChat.name }}</p>
                <p class="text-xs font-semibold text-muted uppercase tracking-wider">{{ activeChat.role }}</p>
              </div>
            </div>
            <button class="p-2 text-muted hover:text-text transition-colors">⚙️</button>
          </div>
          
          <!-- Messages -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6 bg-page">
            <div v-for="msg in messages" :key="msg.id" class="flex flex-col" :class="msg.sender === 'me' ? 'items-end' : 'items-start'">
              <div class="max-w-[70%] px-4 py-2.5 rounded-2xl text-sm" 
                   :class="msg.sender === 'me' ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-border text-text rounded-tl-none shadow-sm'">
                {{ msg.text }}
              </div>
              <p class="text-[10px] font-bold text-muted mt-1 px-1">{{ msg.time }}</p>
            </div>
          </div>

          <!-- Input Area -->
          <div class="p-4 border-t border-border bg-surface shrink-0">
            <div class="flex items-end gap-2">
              <button class="p-3 text-muted hover:text-primary transition-colors shrink-0">📎</button>
              <textarea placeholder="Type a message..." class="flex-1 bg-page border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary shadow-sm resize-none" rows="1"></textarea>
              <button class="p-3 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-sm transition-all shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </template>
        <div v-else class="flex-1 flex flex-col items-center justify-center text-center p-10 bg-page">
          <div class="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center text-2xl mb-4 shadow-sm">✉️</div>
          <h2 class="text-xl font-bold text-text mb-2">Your Messages</h2>
          <p class="text-muted text-sm max-w-sm">Select a conversation from the sidebar to view your messages or start a new conversation.</p>
        </div>
      </div>

    </div>
  </div>
</template>