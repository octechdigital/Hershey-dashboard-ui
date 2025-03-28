import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DarkModeState {
    isDarkMode: boolean;
}

const darkMode: DarkModeState = {
    isDarkMode: false, // Initial state is light mode
};

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState:darkMode,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode; // Toggle the dark mode state
        },
    },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
