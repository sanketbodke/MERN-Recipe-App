export const useGetUserId = () => {
    const persistedData = localStorage.getItem('persist:root');
    const parsedData = JSON.parse(persistedData);
    const userData = parsedData ? JSON.parse(parsedData.user) : null;
    return userData.currentUser.data.data.user._id;
};