import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reserve a Table | Banjara Indian Restaurant',
  description: 'Book your dining experience at Banjara. Easy online reservations for lunch, dinner, or special occasions.',
  keywords: 'restaurant reservation, book table, Banjara restaurant, Indian cuisine, dining reservation',
  openGraph: {
    title: 'Reserve a Table | Banjara Indian Restaurant',
    description: 'Book your dining experience at Banjara. Easy online reservations for lunch, dinner, or special occasions.',
    type: 'website',
    url: 'https://banjararestaurant.com/reservations',
    images: [
      {
        url: 'https://banjararestaurant.com/banner1.png',
        width: 1200,
        height: 630,
        alt: 'Banjara Restaurant Reservations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reserve a Table | Banjara Indian Restaurant',
    description: 'Book your dining experience at Banjara. Easy online reservations for lunch, dinner, or special occasions.',
    images: ['https://banjararestaurant.com/banner1.png'],
  },
};

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}