const useStudioNavigation = () => {
  const openInStudio = (documentId: string) => {
    // Open the document in Sanity Studio
    const isDev = process.env.NODE_ENV === 'development';
    const baseUrl = isDev ? 'http://localhost:3334' : window.location.origin;
    // Use the correct URL format for Sanity Studio
    const studioUrl = `${baseUrl}/structure/post;${documentId}`;
    console.log('Opening studio URL:', studioUrl); // Debug log
    window.open(studioUrl, '_blank');
  };

  return { openInStudio };
};

export default useStudioNavigation;
