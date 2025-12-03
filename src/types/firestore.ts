export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    priceType: "FIXED" | "PERCENTAGE" | "QUOTE";
    category: string;
    imageUrl: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "ADMIN" | "CLIENT";
    image?: string | null;
    createdAt: Date;
    updatedAt?: Date;
    phone: string | null;
    profile: { tags: string[] } | null;
    _count: { bookings: number };
    bookings?: Booking[];
    marketingOptOut?: boolean;
    termsAccepted?: boolean;
    preferences?: string;
    lifestyleNotes?: string;
    vipStatus?: string;
    favoriteServices?: string[];
    tags?: string[];
}

export interface Booking {
    id: string;
    userId: string;
    serviceId: string;
    date: Date;
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
    notes: string | null;
    adminNotes: string | null;
    user?: UserProfile;
    service?: Service;
    createdAt?: Date;
    updatedAt?: Date;
}
