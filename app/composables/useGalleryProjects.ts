import type { Project } from "~/types";

/**
 * Composable for managing gallery projects data
 * Data is hardcoded since we don't use a database for project metadata
 * Media files are served from Cloudflare R2 (production) or /public folder (local)
 */
export function useGalleryProjects() {
  const { getMediaUrl: getUrl } = useMedia();

  const projects: Project[] = [
    {
      id: "510A214A",
      title: "Dea & Friends",
      location: "Yogyakarta, Indonesia",
      day: 6,
      month: 12,
      year: 2025,
      thumbnail: { type: "video", src: "2025/510A214A/video/510A214A_video_1.mp4" },
      media: [
        { id: 1, type: "video", src: "2025/510A214A/video/510A214A_video_1.mp4", title: "Teaser" },
        {
          id: 2,
          type: "video",
          src: "2025/510A214A/video/510A214A_video_2.mp4",
          title: "Instant Moment",
        },
        { id: 3, type: "photo", src: "2025/510A214A/photo/510A214A_photo_1.jpg" },
        { id: 4, type: "photo", src: "2025/510A214A/photo/510A214A_photo_2.jpg" },
        { id: 5, type: "photo", src: "2025/510A214A/photo/510A214A_photo_3.jpg" },
        { id: 6, type: "photo", src: "2025/510A214A/photo/510A214A_photo_4.jpg" },
        { id: 7, type: "photo", src: "2025/510A214A/photo/510A214A_photo_5.jpg" },
        { id: 8, type: "photo", src: "2025/510A214A/photo/510A214A_photo_6.jpg" },
      ],
    },
    {
      id: "5C11FDE7",
      title: "Furqon & Family",
      location: "Yogyakarta, Indonesia",
      day: 21,
      month: 12,
      year: 2025,
      thumbnail: { type: "video", src: "2025/5C11FDE7/video/5C11FDE7_video_1.mp4" },
      media: [
        { id: 1, type: "video", src: "2025/5C11FDE7/video/5C11FDE7_video_1.mp4", title: "Teaser" },
        {
          id: 2,
          type: "video",
          src: "2025/5C11FDE7/video/5C11FDE7_video_2.mp4",
          title: "Instant Moment",
        },
        { id: 3, type: "photo", src: "2025/5C11FDE7/photo/5C11FDE7_photo_1.jpg" },
        { id: 4, type: "photo", src: "2025/5C11FDE7/photo/5C11FDE7_photo_2.jpg" },
        { id: 5, type: "photo", src: "2025/5C11FDE7/photo/5C11FDE7_photo_3.jpg" },
        { id: 6, type: "photo", src: "2025/5C11FDE7/photo/5C11FDE7_photo_4.jpg" },
        { id: 7, type: "photo", src: "2025/5C11FDE7/photo/5C11FDE7_photo_5.jpg" },
        { id: 8, type: "photo", src: "2025/5C11FDE7/photo/5C11FDE7_photo_6.jpg" },
      ],
    },
    {
      id: "F39544C0",
      title: "Rizvi & Family",
      location: "Yogyakarta, Indonesia",
      day: 21,
      month: 12,
      year: 2025,
      thumbnail: { type: "video", src: "2025/F39544C0/video/F39544C0_video_1.mp4" },
      media: [
        { id: 1, type: "video", src: "2025/F39544C0/video/F39544C0_video_1.mp4", title: "Teaser" },
        {
          id: 2,
          type: "video",
          src: "2025/F39544C0/video/F39544C0_video_2.mp4",
          title: "Instant Moment",
        },
        { id: 3, type: "photo", src: "2025/F39544C0/photo/F39544C0_photo_1.jpg" },
        { id: 4, type: "photo", src: "2025/F39544C0/photo/F39544C0_photo_2.jpg" },
        { id: 5, type: "photo", src: "2025/F39544C0/photo/F39544C0_photo_3.jpg" },
        { id: 6, type: "photo", src: "2025/F39544C0/photo/F39544C0_photo_4.jpg" },
        { id: 7, type: "photo", src: "2025/F39544C0/photo/F39544C0_photo_5.jpg" },
        { id: 8, type: "photo", src: "2025/F39544C0/photo/F39544C0_photo_6.jpg" },
        { id: 9, type: "photo", src: "2025/F39544C0/photo/F39544C0_photo_7.jpg" },
      ],
    },
    {
      id: "EA2A7C87",
      title: "Faisal Asahan & Family",
      location: "Yogyakarta, Indonesia",
      day: 23,
      month: 12,
      year: 2025,
      thumbnail: { type: "video", src: "2025/EA2A7C87/video/EA2A7C87_video_1.mp4" },
      media: [
        { id: 1, type: "video", src: "2025/EA2A7C87/video/EA2A7C87_video_1.mp4", title: "Teaser" },
        {
          id: 2,
          type: "video",
          src: "2025/EA2A7C87/video/EA2A7C87_video_2.mp4",
          title: "Instant Moment",
        },
        { id: 3, type: "photo", src: "2025/EA2A7C87/photo/EA2A7C87_photo_1.jpg" },
        { id: 4, type: "photo", src: "2025/EA2A7C87/photo/EA2A7C87_photo_2.jpg" },
        { id: 5, type: "photo", src: "2025/EA2A7C87/photo/EA2A7C87_photo_3.jpg" },
        { id: 6, type: "photo", src: "2025/EA2A7C87/photo/EA2A7C87_photo_4.jpg" },
        { id: 7, type: "photo", src: "2025/EA2A7C87/photo/EA2A7C87_photo_5.jpg" },
      ],
    },
    {
      id: "474EC7A0",
      title: "Dewi & Lover",
      location: "Yogyakarta, Indonesia",
      day: 23,
      month: 12,
      year: 2025,
      thumbnail: { type: "photo", src: "2025/474EC7A0/photo/474EC7A0_photo_1.jpg" },
      media: [
        { id: 1, type: "photo", src: "2025/474EC7A0/photo/474EC7A0_photo_1.jpg" },
        { id: 2, type: "photo", src: "2025/474EC7A0/photo/474EC7A0_photo_2.jpg" },
        { id: 3, type: "photo", src: "2025/474EC7A0/photo/474EC7A0_photo_3.jpg" },
      ],
    },
    {
      id: "4889166C",
      title: "Reni & Lover",
      location: "Yogyakarta, Indonesia",
      day: 27,
      month: 12,
      year: 2025,
      thumbnail: { type: "photo", src: "2025/4889166C/photo/4889166C_photo_1.jpg" },
      media: [
        { id: 1, type: "photo", src: "2025/4889166C/photo/4889166C_photo_1.jpg" },
        { id: 2, type: "photo", src: "2025/4889166C/photo/4889166C_photo_2.jpg" },
        { id: 3, type: "photo", src: "2025/4889166C/photo/4889166C_photo_3.jpg" },
        { id: 4, type: "photo", src: "2025/4889166C/photo/4889166C_photo_4.jpg" },
        { id: 5, type: "photo", src: "2025/4889166C/photo/4889166C_photo_5.jpg" },
        { id: 6, type: "photo", src: "2025/4889166C/photo/4889166C_photo_6.jpg" },
      ],
    },
    {
      id: "D2FE3DB0",
      title: "Dewi & Husband",
      location: "Yogyakarta, Indonesia",
      day: 29,
      month: 12,
      year: 2025,
      thumbnail: { type: "photo", src: "2025/D2FE3DB0/photo/D2FE3DB0_photo_1.jpg" },
      media: [
        { id: 1, type: "photo", src: "2025/D2FE3DB0/photo/D2FE3DB0_photo_1.jpg" },
        { id: 2, type: "photo", src: "2025/D2FE3DB0/photo/D2FE3DB0_photo_2.jpg" },
        { id: 3, type: "photo", src: "2025/D2FE3DB0/photo/D2FE3DB0_photo_3.jpg" },
        { id: 4, type: "photo", src: "2025/D2FE3DB0/photo/D2FE3DB0_photo_4.jpg" },
        { id: 5, type: "photo", src: "2025/D2FE3DB0/photo/D2FE3DB0_photo_5.jpg" },
        { id: 6, type: "photo", src: "2025/D2FE3DB0/photo/D2FE3DB0_photo_6.jpg" },
      ],
    },
    {
      id: "94C0D23F",
      title: "Alex & Friends",
      location: "Yogyakarta, Indonesia",
      day: 1,
      month: 1,
      year: 2026,
      thumbnail: { type: "photo", src: "2026/94C0D23F/photo/94C0D23F_photo_1.jpg" },
      media: [
        { id: 1, type: "photo", src: "2026/94C0D23F/photo/94C0D23F_photo_1.jpg" },
        { id: 2, type: "photo", src: "2026/94C0D23F/photo/94C0D23F_photo_2.jpg" },
        { id: 3, type: "photo", src: "2026/94C0D23F/photo/94C0D23F_photo_3.jpg" },
        { id: 4, type: "photo", src: "2026/94C0D23F/photo/94C0D23F_photo_4.jpg" },
        { id: 5, type: "photo", src: "2026/94C0D23F/photo/94C0D23F_photo_5.jpg" },
      ],
    },
    {
      id: "C15B202C",
      title: "Anne & Lover",
      location: "Yogyakarta, Indonesia",
      day: 4,
      month: 1,
      year: 2026,
      thumbnail: { type: "photo", src: "2026/C15B202C/photo/C15B202C_photo_1.jpg" },
      media: [
        { id: 1, type: "photo", src: "2026/C15B202C/photo/C15B202C_photo_1.jpg" },
        { id: 2, type: "photo", src: "2026/C15B202C/photo/C15B202C_photo_2.jpg" },
        { id: 3, type: "photo", src: "2026/C15B202C/photo/C15B202C_photo_3.jpg" },
        { id: 4, type: "photo", src: "2026/C15B202C/photo/C15B202C_photo_4.jpg" },
        { id: 5, type: "photo", src: "2026/C15B202C/photo/C15B202C_photo_5.jpg" },
      ],
    },
    {
      id: "C3ACFFB3",
      title: "Ayu & Family",
      location: "Yogyakarta, Indonesia",
      day: 4,
      month: 1,
      year: 2026,
      thumbnail: { type: "photo", src: "2026/C3ACFFB3/photo/C3ACFFB3_photo_1.jpg" },
      media: [
        { id: 1, type: "photo", src: "2026/C3ACFFB3/photo/C3ACFFB3_photo_1.jpg" },
        { id: 2, type: "photo", src: "2026/C3ACFFB3/photo/C3ACFFB3_photo_2.jpg" },
        { id: 3, type: "photo", src: "2026/C3ACFFB3/photo/C3ACFFB3_photo_3.jpg" },
        { id: 4, type: "photo", src: "2026/C3ACFFB3/photo/C3ACFFB3_photo_4.jpg" },
        { id: 5, type: "photo", src: "2026/C3ACFFB3/photo/C3ACFFB3_photo_5.jpg" },
      ],
    },
  ];
  const PROJECTS_PER_PAGE = 5;

  const formatDate = (project: Project): string => {
    const date = new Date(project.year, project.month - 1, project.day);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getMediaUrl = (media: { type: "photo" | "video"; src: string }) => {
    return getUrl(media.src);
  };

  const getThumbnailUrl = (thumbnail: {
    type: "photo" | "video";
    src: string;
  }) => {
    return getMediaUrl(thumbnail);
  };

  const totalPages = computed(() =>
    Math.ceil(projects.length / PROJECTS_PER_PAGE),
  );

  const getProjectsForPage = (page: number) => {
    const start = page * PROJECTS_PER_PAGE;
    const end = start + PROJECTS_PER_PAGE;
    return projects.slice(start, end);
  };

  return {
    projects,
    PROJECTS_PER_PAGE,
    totalPages,
    getProjectsForPage,
    getMediaUrl,
    getThumbnailUrl,
    formatDate,
  };
}
