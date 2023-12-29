export const useGetUserId = () => {
    return window.localStorage.getItem("userId");
};