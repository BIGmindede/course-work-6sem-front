import { createSlice } from "@reduxjs/toolkit"

const SidebarSlice = createSlice({
    name: 'SidebarSlice',
    initialState: {
        collapsed: true
    },
    reducers: {
        changeCollapsed: (state, action) => {
            if (action.payload !== undefined) state.collapsed = action.payload
            else state.collapsed = !state.collapsed
        }
    }
})

export const { changeCollapsed } = SidebarSlice.actions

export const selectSidebarCollapsed = (state) => state.sidebar.collapsed

export default SidebarSlice.reducer