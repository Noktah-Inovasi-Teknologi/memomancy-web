<script setup lang="ts">
const { listObjects } = useR2();

const { data: r2Data, pending, error, refresh } = await useAsyncData("r2-objects", () => listObjects());

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};
</script>

<template>
  <div class="container mx-auto p-uniform-3">
    <div class="mb-uniform-3">
      <h1 class="font-serif text-heading-2 mb-uniform-4">R2 Bucket Contents</h1>

      <Button
        label="Refresh"
        icon="solar:refresh-linear"
        @click="refresh()"
        :loading="pending"
        class="mb-uniform-4"
      />
    </div>

    <div v-if="pending && !r2Data" class="text-center p-uniform-3">
      <ProgressSpinner />
      <p class="mt-uniform-4">Loading R2 objects...</p>
    </div>

    <div v-else-if="error" class="p-uniform-3 bg-red-100 text-red-800 rounded">
      <h2 class="font-bold mb-uniform-5">Error</h2>
      <p>{{ error.message }}</p>
    </div>

    <div v-else-if="r2Data">
      <div class="mb-uniform-4">
        <p class="text-normal-3">
          <strong>Total Objects:</strong> {{ r2Data.count }}
        </p>
        <p v-if="r2Data.truncated" class="text-normal-4 text-yellow-600">
          Note: Results are truncated. There may be more objects.
        </p>
      </div>

      <div v-if="r2Data.objects && r2Data.objects.length > 0">
        <DataTable
          :value="r2Data.objects"
          stripedRows
          :paginator="r2Data.objects.length > 10"
          :rows="10"
          class="text-normal-4"
        >
          <Column field="key" header="File Path" sortable>
            <template #body="{ data }">
              <code class="text-normal-5">{{ data.key }}</code>
            </template>
          </Column>

          <Column field="size" header="Size" sortable>
            <template #body="{ data }">
              {{ formatFileSize(data.size) }}
            </template>
          </Column>

          <Column field="uploaded" header="Uploaded" sortable>
            <template #body="{ data }">
              {{ formatDate(data.uploaded) }}
            </template>
          </Column>

          <Column header="Preview">
            <template #body="{ data }">
              <a
                :href="`/api/media/${data.key}`"
                target="_blank"
                class="text-blue-600 hover:underline"
              >
                View
              </a>
            </template>
          </Column>
        </DataTable>
      </div>

      <div v-else class="text-center p-uniform-3 bg-gray-100 rounded">
        <p class="text-normal-3">No objects found in R2 bucket</p>
      </div>
    </div>
  </div>
</template>
