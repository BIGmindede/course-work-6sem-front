import { createSlice } from "@reduxjs/toolkit"

const SidebarSlice = createSlice({
    name: 'SidebarSlice',
    initialState: {
        collapsed: true
    },
    reducers: {
        changeCollapsed: (state) => {
            state.collapsed = !state.collapsed
        }
    }
})

export const { changeCollapsed } = SidebarSlice.actions

export const selectSidebarCollapsed = (state) => state.sidebar.collapsed

export default SidebarSlice.reducer