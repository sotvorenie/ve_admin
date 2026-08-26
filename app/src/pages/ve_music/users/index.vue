<script setup lang="ts">
import List from "@common/List.vue";
import {ListHeadType, ListItemType} from "@/types/list.ts";

const headItems: ListHeadType[] = [
  {
    label: 'id',
    type: 'text',
  },
  {
    label: 'Аватар',
    type: 'avatar',
  },
  {
    label: 'Имя',
    type: 'text',
  },
  {
    label: 'Логин',
    type: 'text',
  },
  {
    label: 'Пароль',
    type: 'text',
  },
]

const users: ListItemType[] = [
  {
    url: `/ve_music/users/${1}`,
    items: ['1', '/diane.jpg', 'Витос', '1111', '1111'],
  },
  {
    url: `/ve_music/users/${1}`,
    items: ['1', '/diane.jpg', 'Витос', '1111', '1111'],
  },
  {
    url: `/ve_music/users/${1}`,
    items: ['1', '/diane.jpg', 'Витос', '1111', '1111'],
  },
  {
    url: `/ve_music/users/${1}`,
    items: ['1', '/diane.jpg', 'Витос', '1111', '1111'],
  },
  {
    url: `/ve_music/users/${1}`,
    items: ['1', '/diane.jpg', 'Витос', '1111', '1111'],
  },
  {
    url: `/ve_music/users/${1}`,
    items: ['1', '/diane.jpg', 'Витос', '1111', '1111'],
  },
]

const colsStyle = '4rem 8rem 1fr 1fr 1fr'
</script>

<template>

  <List :items="users" :head-items="headItems" :cols-style="colsStyle"/>

</template>