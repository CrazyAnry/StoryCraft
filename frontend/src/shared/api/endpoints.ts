export const API_ROUTES = {
  auth: {
    login: "/users/auth/login",
    register: "/users/auth/register",
    logout: "/users/auth/logout",
    me: "/users/auth/me",
    updateUserJwt: "/users/auth/update-user-jwt",
  },
  users: {
    findUser: "/users/",
    updateMe: "/users/me",
  },
  stories: {
    AllStories: "/stories",
    getStoriesByLimit: "/stories/paginated",
    getOneStory: (storyId: number) =>
      `/stories/${storyId}`,
    getStoryLikes: (storyId: number) => 
      `/stories/likes/${storyId}`,
    setStoryLike: (storyId: number) => 
      `/stories/likes/like/${storyId}`,
    deleteStoryLike: (storyId: number) => 
      `/stories/likes/unlike/${storyId}`,
    getStoryViews: (storyId: number) => 
      `/stories/views/${storyId}`,
    setStoryView: (storyId: number) => 
      `/stories/views/view/${storyId}`,
  },
  choices: {
    getAllChoices: (storyId: number, sceneId: number) => 
      `/stories/${storyId}/scenes/${sceneId}/choices`,
  },
  scenes: {
    getAllScenes: (storyId: number) => 
      `/stories/${storyId}/scene/`,
    getOneScene: (storyId: number, sceneId: number) => 
      `/stories/${storyId}/scene/${sceneId}`,
  }
};