import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Skeleton, Typography } from "@mui/material";

const ACCESS_KEY = "vaZ3oP-KoyMbQJ6lWIIglBONmJPfppNUqTRGl6nLa3Y";
const PER_PAGE = 10;
const INITIAL_LOAD_COUNT = 20; // Number of skeleton items for the initial load

interface Urls {
  small: string;
  full: string;
  regular: string;
}
interface UnsplashData {
  alt_description: string;
  urls: Urls;
}

// Helper component for the Skeleton Box
const PhotoSkeleton = () => (
  <Box
    sx={{
      width: "100%",
      paddingTop: "150%",
      position: "relative",
      borderRadius: "10px",
    }}
  >
    <Skeleton
      variant="rectangular"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transform: "none",
      }}
    />
  </Box>
);

const Photos = () => {
  const [page, setPage] = useState<number>(1);
  const [photos, setPhotos] = useState<UnsplashData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // New state to track if it's the very first load
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const getPhotos = async (): Promise<void> => {
    try {
      setLoading(true);

      const res = await axios.get<UnsplashData[]>(
        `https://api.unsplash.com/photos?page=${page}&per_page=${PER_PAGE}&client_id=${ACCESS_KEY}`
      );

      setPhotos((prev) => [...prev, ...res.data]);
      // After successfully fetching and setting photos, set isInitialLoad to false
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch api data
  useEffect(() => {
    getPhotos();
  }, [page]);

  // Infinite Scroll Logic: Runs on mount and when 'loading' changes
  useEffect(() => {
    const handleScroll = (): void => {
      // Calculate if the user has scrolled near the bottom of the page
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200;

      // If at the bottom AND not currently loading, load the next page
      if (scrolledToBottom && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]); // Dependency on 'loading' is important to avoid stale 'loading' value in the closure

  // Decide what to render in the main content area
  const renderMainContent = () => {
    // 1. Initial Load Skeleton
    if (isInitialLoad && loading) {
      // Render skeletons equal to what PER_PAGE * initial grid columns might cover
      return Array.from({ length: INITIAL_LOAD_COUNT }).map((_, index) => (
        <PhotoSkeleton key={`initial-skeleton-${index}`} />
      ));
    }

    // 2. Render Photos
    return photos.map((elem, idx) => (
      <Box
        key={idx}
        sx={{
          width: "100%",
          paddingTop: "150%",
          position: "relative",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        <img
          src={elem.urls.small}
          alt={elem.alt_description}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    ));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)", // Improved responsive grid
          gap: 2,
        }}
      >
        {renderMainContent()}
      </Box>

      {/* This displays the Loading/Skeleton for subsequent infinite scrolls (page > 1) */}
      {loading && !isInitialLoad && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: 2,
            mt: 2, // Margin top for separation
          }}
        >
          {/* Render skeletons for the number of items we're trying to fetch */}
          {Array.from({ length: PER_PAGE }).map((_, index) => (
            <PhotoSkeleton key={`scroll-skeleton-${index}`} />
          ))}
        </Box>
      )}

      {/* Optional text indicator for infinite scroll loading */}
      {loading && !isInitialLoad && (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h4" fontSize={"2rem"}>
            Loading more photos...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Photos;
