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
]);
const fileupload = ref();
const eventsData = ref<EventReality>(eventReality);
const selectedFiles = ref<File[]>([]);
const isUploading = ref(false);

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
  selectedFiles.value = event.files;
  console.log("Selected files:", selectedFiles.value);
}

async function createEventAndMedia(event: any) {
  if (isUploading.value) return;
  
  try {
    isUploading.value = true;
    
    // Create FormData to send both event data and files
    const formData = new FormData();
    
    // Add event data to FormData
    formData.append('name', eventsData.value.name);
    formData.append('description', eventsData.value.description);
    formData.append('startDate', eventsData.value.startDate.toISOString());
    formData.append('endDate', eventsData.value.endDate.toISOString());
    formData.append('location', eventsData.value.location);
    formData.append('eventType', eventsData.value.eventType);
    formData.append('outdoor', eventsData.value.outdoor);
    formData.append('capacity', eventsData.value.capacity.toString());
    formData.append('region', eventsData.value.region);
    formData.append('createdAt', eventsData.value.createdAt.toISOString());
    formData.append('updatedAt', eventsData.value.updatedAt.toISOString());
    
    // Add selected files to FormData
    selectedFiles.value.forEach((file, index) => {
      formData.append(`media_${index}`, file);
    });
    
    // Send to the events API endpoint
    const response = await $fetch('/api/events', {
      method: 'POST',
      body: formData
    });
    
    console.log('Event created successfully:', response);
    
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Event created with ${response.mediaCount} media files`,
      life: 3000
    });
    
    // Reset form
    eventsData.value = { ...eventReality };
    selectedFiles.value = [];
    if (fileupload.value) {
      fileupload.value.clear();
    }
    
  } catch (error) {
    console.error('Error creating event:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to create event. Please try again.',
      life: 5000
    });
  } finally {
    isUploading.value = false;
  }
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
  <Toast />
  <div class="flex max-md:flex-col md:flex-row bg-color-alternating w-full p-uniform-3">
    <div>
      <Menu :model="menu" />
    </div>
    <div>
      <div class="bg-color-alternating" v-if="activePanel === 'upload'">
        <div >
          <p>Tambah Event</p>
          <Form
            v-slot="$form"
            :initialValues="eventsData"
            @submit.prevent="createEventAndMedia"
          >
            <div>
              <div>
                <label for="event-name">Nama Event</label>
                <InputText v-model="eventsData.name" id="event-name" />
              </div>
              <div>
                <label for="event-description">Deskripsi</label>
                <InputText
                  v-model="eventsData.description"
                  id="event-description"
                />
              </div>
              <div>
                <label for="event-start-date">Tanggal Mulai</label>
                <DatePicker
                  v-model="eventsData.startDate"
                  id="event-start-date"
                  selectionMode="single"
                />
              </div>
              <div>
                <label for="event-end-date">Tanggal Berakhir</label>
                <DatePicker
                  v-model="eventsData.endDate"
                  id="event-end-date"
                  selectionMode="single"
                />
              </div>
              <div>
                <label for="event-location">Lokasi</label>
                <InputText v-model="eventsData.location" id="event-location" />
              </div>
              <div>
                <label for="event-event-type">Jenis Acara</label>
                <InputText
                  v-model="eventsData.eventType"
                  id="event-event-type"
                />
              </div>
              <div>
                <label for="event-outdoor">Jenis Tempat</label>
                <SelectButton
                  v-model="eventsData.outdoor"
                  id="event-outdoor"
                  :options="optionsOutdoor"
                />
              </div>
              <div>
                <label for="event-capacity">Kapasitas</label>
                <InputNumber v-model="eventsData.capacity" id="event-capacity" name="capacity" />
              </div>
              <div>
                <label for="event-region">Daerah</label>
                <Select
                  v-model="eventsData.region"
                  id="event-region"
                  :options="optionsRegion"
                  optionLabel="label"
                  optionValue="value"
                />
              </div>
              <div>
                <label for="event-created-at">Dibuat Tanggal</label>
                <DatePicker
                  v-model="eventsData.createdAt"
                  id="event-created-at"
                  selectionMode="single"
                />
              </div>
              <div>
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
                accept="image/*,video/*"
                :multiple="true"
                :maxFileSize="100000000"
                @select="onMediaSelect"
                :auto="false"
                mode="basic"
              >
                <template #empty>
                  <span>Drag and drop files here to upload.</span>
                </template>
              </FileUpload>
            </div>
            <Button type="submit" :loading="isUploading" :disabled="isUploading">
              <p>{{ isUploading ? 'Creating Event...' : 'Submit' }}</p>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
