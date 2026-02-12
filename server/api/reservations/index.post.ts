import type { ReservationPayload } from "~/types";
import { whatsappLink } from "~/data/commonInformations";
import { formatPrice } from "~/data/pricingData";

export interface ReservationSubmitResponse {
  success: boolean;
  whatsappUrl: string;
}

export default defineEventHandler(async (event): Promise<ReservationSubmitResponse> => {
  const body = await readBody<ReservationPayload>(event);

  // Validate required fields
  const requiredFields: (keyof ReservationPayload)[] = [
    "eventDate",
    "eventType",
    "location",
    "region",
    "venueType",
    "guestCount",
    "eventDuration",
    "packageId",
    "packageName",
    "packagePrice",
    "totalPrice",
    "customerName",
    "customerEmail",
    "customerPhone",
  ];

  for (const field of requiredFields) {
    if (!body[field] && body[field] !== 0) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required field: ${field}`,
      });
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.customerEmail)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email format",
    });
  }

  // Validate phone format (Indonesian)
  const phoneClean = body.customerPhone.replace(/[\s\-()]/g, "");
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  if (!phoneRegex.test(phoneClean)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid phone number format",
    });
  }

  // Validate event date is in the future
  const eventDate = new Date(body.eventDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (eventDate < today) {
    throw createError({
      statusCode: 400,
      statusMessage: "Event date must be in the future",
    });
  }

  // Generate WhatsApp URL
  const whatsappUrl = generateWhatsAppUrl(body);

  return {
    success: true,
    whatsappUrl,
  };
});

function generateWhatsAppUrl(data: ReservationPayload): string {
  const date = new Date(data.eventDate);
  const formattedDate = date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const venueTypeLabel = {
    indoor: "Indoor",
    outdoor: "Outdoor",
    both: "Indoor & Outdoor",
  }[data.venueType];

  let message = `Halo Memomancy! 👋\n\n`;
  message += `Saya ingin melakukan reservasi:\n\n`;
  message += `━━━ DETAIL ACARA ━━━\n`;
  message += `📅 Tanggal: ${formattedDate}\n`;
  message += `📍 Lokasi: ${data.location}\n`;
  message += `🏠 Venue: ${venueTypeLabel}\n`;
  message += `👥 Jumlah Tamu: ${data.guestCount} orang\n`;
  message += `⏱️ Durasi: ${data.eventDuration} jam\n\n`;

  message += `━━━ PAKET & LAYANAN ━━━\n`;
  message += `📦 Paket: ${data.packageName}\n`;
  message += `💵 Harga Paket: Rp ${formatPrice(data.packagePrice)}\n`;

  if (data.addOns && data.addOns.length > 0) {
    message += `\n➕ Add-ons:\n`;
    data.addOns.forEach((addOn) => {
      message += `   • ${addOn.name}: Rp ${formatPrice(addOn.calculatedPrice)}\n`;
    });
  }

  message += `\n💰 TOTAL ESTIMASI: Rp ${formatPrice(data.totalPrice)}\n\n`;

  message += `━━━ INFORMASI KONTAK ━━━\n`;
  message += `👤 Nama: ${data.customerName}\n`;
  message += `📧 Email: ${data.customerEmail}\n`;
  message += `📱 No. HP: ${data.customerPhone}\n`;

  if (data.customerNotes) {
    message += `\n📝 Catatan: ${data.customerNotes}\n`;
  }

  message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Mohon konfirmasi ketersediaan. Terima kasih! 🙏`;

  return `${whatsappLink}?text=${encodeURIComponent(message)}`;
}
