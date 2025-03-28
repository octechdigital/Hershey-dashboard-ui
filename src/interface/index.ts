export interface GludeinRailInfo {
  contentType: string;
  itemCount: number;
  itemList: AssetItem[];
  placement: string;
  position: number;
  railId: string;
  railName: string;
  thumbnailUrl: string;
  type: string;
}

export interface AssetItem {
  assetId: string;
  bannerUrl: string;
  contentType: "video" | "image"; // types to be added in future
  description: string;
  displayName: string;
  firstName: string;
  followers: number;
  id: string;
  lastName: string;
  likeCount: number;
  ordering: number;
  playCount: string;
  pristine_image: string;
  thumbnail: string;
  url: string;
  contentUrls: { urls: string }[];
  video: VideoAsset; // types to be added in future
}

export interface VideoAsset {
  categoryId: string;
  categoryName: string;
  commentCount: number;
  contentType: "video";
  contentUrls: any[];
  createdAt: string;
  description: string;
  likeCount: number;
  products: any[];
  s3Url: string;
  shoppable: false;
  soundUrl: string;
  status: string;
  taggedUsers: any[];
  thumbnailUrl: string;
  thumbnailUrls: string[];
  title: string;
  topicId: string;
  user: {
    userName: string;
    profileImageUrl: string;
    email: string;
    fullName: string;
    userId: string;
  };
  userId: string;
  videoId: string;
  videoUrls: string[];
  viewsCount: number;
  _id: string;
}
