<script lang="ts" setup>
import type { EventReality, Media } from "~/types";
import { Form } from "@primevue/forms";
import { eventReality } from "~/populate";

useSeoMeta({
  title: `Dashboard | ${useRuntimeConfig().app.name}`,
});

const toast = useToast();

const activePanel = ref<string>("");
const menu = ref([
  { label: "Upload", command: () => (activePanel.value = "upload") },
  { label: "Blob", command: () => (activePanel.value = "blobs") },
]);
const fileupload = ref();
const eventsData = ref<EventReality>(eventReality);
const blobs = ref([]);

const optionsOutdoor = ref(["Outdoor", "Indoor"]);
const optionsRegion = ref([
  { label: "Bangkalan", value: "bangkalan" },
  { label: "Gresik", value: "gresik" },
  { label: "Pamekasan", value: "pamekasan" },
  { label: "Sampang", value: "sampang" },
  { label: "Sumenep", value: "sumenep" },
  { label: "Surabaya", value: "surabaya" },
]);

function onMediaSelect(event: any) {
  console.log(event);
}
async function createEventAndMedia(event: any) {
  console.log(event);
}
async function readMedia() {
  const data = await $fetch("/api/media", {
    method: "GET",
  });
  console.log(data);
}
onBeforeMount(async () => {
  await readMedia();
});
</script>

<template>
  <div class="flex w-full bg-color-alternating gap-uniform-4">
    <div class="m-8 basis-1/6">
      <Menu :model="menu" />
    </div>
    <div
      class="m-8 p-8 basis-5/6 border border-color-alternating-inverted rounded-[3rem]"
    >
      <div class="flex flex-col gap-uniform-4" v-if="activePanel === 'upload'">
        <div class="flex flex-col gap-uniform-4">
          <p class="text-2xl font-bold">Tambah Event</p>
          <Form
            class="flex flex-col gap-uniform-4"
            v-slot="$form"
            :initialValues="eventsData"
            @submit.prevent="createEventAndMedia"
          >
            <div class="grid grid-cols-4 gap-uniform-6">
              <div class="flex flex-col gap-uniform-7">
                <label for="event-name">Nama Event</label>
                <InputText v-model="eventsData.name" id="event-name" />
              </div>
              <div class="flex flex-col gap-uniform-7">
                <label for="event-description">Deskripsi</label>
                <InputText
                  v-model="eventsData.description"
                  id="event-description"
                />
              </div>
              <div class="flex flex-col gap-uniform-7">
                <label for="event-start-date">Tanggal Mulai</label>
                <DatePicker
                  v-model="eventsData.startDate"
                  id="event-start-date"
                  selectionMode="single"
                />
              </div>
              <div class="flex flex-col gap-uniform-7">
                <label for="event-end-date">Tanggal Berakhir</label>
                <DatePicker
                  v-model="eventsData.endDate"
                  id="event-end-date"
                  selectionMode="single"
                />
              </div>
              <div class="flex flex-col gap-uniform-7">
                <label for="event-location">Lokasi</label>
                <InputText v-model="eventsData.location" id="event-location" />
              </div>
              <div class="flex flex-col gap-uniform-7">
                <label for="event-event-type">Jenis Acara</label>
                <InputText
                  v-model="eventsData.eventType"
                  id="event-event-type"
                />
              </div>
              <div class="flex flex-col gap-uniform-7">
                <label for="event-outdoor">Jenis Tempat</label>
                <SelectButton
                  v-model="eventsData.outdoor"
                  id="event-outdoor"
                  :options="optionsOutdoor"
                />
              </div>
              <div class="flex flex-col gap-uniform-7">
                <label for="event-capacity">Kapasitas</label>
                <InputNumber id="event-capacity" name="capacity" />
              </div>
              <div class="flex flex-col gap-uniform-7">
                <label for="event-region">Daerah</label>
                <Select
                  v-model="eventsData.region"
                  id="event-region"
                  :options="optionsRegion"
                  optionLabel="label"
                  optionValue="value"
                />
              </div>
              <div class="flex flex-col gap-uniform-7">
                <label for="event-created-at">Dibuat Tanggal</label>
                <DatePicker
                  v-model="eventsData.createdAt"
                  id="event-created-at"
                  selectionMode="single"
                />
              </div>
              <div class="flex flex-col gap-uniform-7">
                <label for="event-updated-at">Terakhir Diubah</label>
                <DatePicker
                  v-model="eventsData.updatedAt"
                  id="event-updated-at"
                  selectionMode="single"
                />
              </div>
            </div>
            <div>
              <FileUpload
                ref="fileupload"
                name="uploadMedia[]"
                url="/api/media"
                accept="image/*,video/*"
                :multiple="true"
                :maxFileSize="100000000"
                @select="onMediaSelect"
                customUpload
              >
                <template #empty>
                  <span>Drag and drop files here to upload.</span>
                </template>
              </FileUpload>
            </div>
            <Button type="submit">
              <p>Submit</p>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
