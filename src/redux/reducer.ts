import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Img {
  asset_id: string;
  bytes: number;
  created_at: string;
  folder: string;
  format: string;
  height: number;
  public_id: string;
  resource_type: string;
  secure_url: string;
  type: string;
  url: string;
  version: number;
  width: number;
}
export interface AlertState {
  show: boolean;
  message: string;
  alertType: string;
}

export interface State {
  loading: boolean;
  images: Img[];
  searchQuery: string;
  filteredImages: Img[];
  isMobileOrTablet: boolean;
  alert: AlertState;
}

const initialState: State = {
  loading: false,
  images: [],
  searchQuery: "",
  filteredImages: [],
  isMobileOrTablet: false,
  alert: {
    show: false,
    message: "",
    alertType: "info",
  },
};
const imgSlice = createSlice({
  name: "imgReducer",
  initialState,
  reducers: {
    isLoad: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateImages: (state, action: PayloadAction<Img[]>) => {
      state.images = action.payload;
      state.filteredImages = action.payload;
    },
    filterImages: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredImages = state.images.filter((image) =>
        image.public_id.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    showAlert: (state, action: PayloadAction<AlertState>) => {
      state.alert = {
        show: true,
        message: action.payload.message,
        alertType: action.payload.alertType,
      };
    },
    hideAlert: (state, action: PayloadAction<boolean>) => {
      state.alert = {
        show: action.payload,
        message: "",
        alertType: "",
      };
    },
    IsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobileOrTablet = action.payload;
    },
  },
});

export const {
  isLoad,
  updateImages,
  filterImages,
  showAlert,
  hideAlert,
  IsMobile,
} = imgSlice.actions;
export default imgSlice.reducer;
