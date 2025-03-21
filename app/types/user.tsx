export interface IUser {
    _id: string; // Use string instead of mongoose.Types.ObjectId
    email: string;
    fullName: string;
    profilePic?: string;
    createdAt?: string;
    updatedAt?: string;
}
