import React from "react";
import { discover, search, IMovie } from "./services/movieService";
import {
  Flex,
  Center,
  Spacer,
  Grid,
  GridItem,
  Text,
  AspectRatio,
  Image,
  Container,
  InputGroup,
  InputLeftElement,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ImFire, ImSearch } from "react-icons/im";
import StarRatings from "react-star-ratings";

function App() {
  const [movies, setMovies] = React.useState<IMovie[]>([]);
  const [filteredMovies, setFilteredMovies] = React.useState<IMovie[]>([]);
  const [ratingFilter, setRatingFilter] = React.useState<number | undefined>();
  const [searchText, setSearchText] = React.useState<string | undefined>();
  const [selectedMovie, setSelectedMovie] = React.useState<IMovie>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    if (searchText) {
      search(searchText).then((movies) => {
        setMovies(movies);
      });
    } else {
      discover().then((movies) => {
        setMovies(movies);
      });
    }
  }, [searchText]);

  React.useEffect(() => {
    if (ratingFilter) {
      setFilteredMovies(
        movies.filter(
          (m) =>
            m.vote_average >= ratingFilter * 2 - 2 &&
            m.vote_average <= ratingFilter * 2
        )
      );
    } else {
      setFilteredMovies(movies);
    }
  }, [ratingFilter, movies]);

  React.useEffect(() => {
    if (selectedMovie) {
      onOpen();
    } else {
      onClose();
    }
  }, [selectedMovie, onOpen, onClose]);

  const onChangeRatingFilter = (rating: number) => {
    if (rating !== ratingFilter) {
      setRatingFilter(rating);
    } else {
      setRatingFilter(undefined);
    }
  };

  return (
    <>
      <Center w="100%" minH="400px">
        <Center pos="absolute" zIndex={1} w="350px">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={
                <Center mt="2">
                  <ImSearch fill="gray.300" />
                </Center>
              }
            />
            <Input
              bg="white"
              size="lg"
              color="black"
              placeholder="Search for a movie…"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </InputGroup>
        </Center>
        <AspectRatio
          maxH="400px"
          minW="100%"
          pos="relative"
          _after={{
            content: '""',
            bgSize: "cover",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pos: "absolute",
            bg: "rgba(0,0,0,.7)",
          }}
        >
          <Image
            src="https://s2.dmcdn.net/v/NcWBd1Q_YunRc_0MR/x1080"
            alt="My awesome movie theater app banner"
            objectFit="cover"
          />
        </AspectRatio>
      </Center>
      <Container w="100%" maxW="1024px" p="2">
        <Container w="100%" maxW="100%">
          <Flex w="100%" py={4}>
            <Center>
              {searchText ? (
                <ImSearch fontSize="1.1em" fill="red" />
              ) : (
                <ImFire fontSize="1.1em" fill="red" />
              )}
              <Text fontSize="1.1em" fontWeight="bold" ml="3">
                {searchText ? "Search Results" : "Popular Movies"}
              </Text>
            </Center>
            <Spacer />
            <Center pb={1}>
              <StarRatings
                rating={ratingFilter}
                starDimension="20px"
                starRatedColor="red"
                changeRating={onChangeRatingFilter}
                numberOfStars={5}
                name="rating"
              />
            </Center>
          </Flex>
        </Container>
        <Container w="100%" maxW="100%">
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={6}
          >
            {filteredMovies.map((movie, index) => {
              const gridItemProps =
                index === 0 ? { colSpan: 2, rowSpan: 2 } : {};
              return (
                <GridItem {...gridItemProps}>
                  <AspectRatio minHeight="200px" maxW="400px" ratio={2 / 3}>
                    <Image
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      fallbackSrc="https://via.placeholder.com/140x220?text=Not%20Found"
                      alt={movie.original_title}
                      objectFit="cover"
                      onClick={() => setSelectedMovie(movie)}
                    />
                  </AspectRatio>
                </GridItem>
              );
            })}
          </Grid>
        </Container>
      </Container>
      <Modal
        onClose={() => setSelectedMovie(undefined)}
        isOpen={isOpen}
        isCentered
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent minH="80%">
          <ModalHeader>Movie Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              overflow="hidden"
              w="100%"
              pos="relative"
              flexDirection="column"
            >
              <Flex
                pos="absolute"
                w="100%"
                justifyContent="flex-end"
                zIndex={1}
              >
                <Flex
                  flexDirection="column"
                  alignItems="flex-end"
                  p={6}
                  w="40%"
                >
                  <Text
                    pb={10}
                    w="100%"
                    color="white"
                    fontWeight="bold"
                    textAlign="center"
                    fontSize={24}
                  >
                    {selectedMovie?.original_title}
                  </Text>
                  <Flex alignItems="flex-end" w="100%">
                    <Flex pointerEvents="none" pb={2} flexDirection="column">
                      <StarRatings
                        rating={
                          selectedMovie?.vote_average
                            ? selectedMovie.vote_average / 2
                            : 0
                        }
                        starDimension="16px"
                        starRatedColor="yellow"
                        changeRating={() => {}}
                        numberOfStars={5}
                        name="rating"
                      />
                      <Text textAlign="right" color="white">
                        {selectedMovie?.vote_average} of 10 (
                        {selectedMovie?.vote_count} votes)
                      </Text>
                      <Flex flexDirection="column" pt={6}>
                        <Text textAlign="right"> Release Date:</Text>
                        <Text textAlign="right" fontWeight="bold">
                          {" "}
                          {selectedMovie?.release_date}
                        </Text>
                      </Flex>
                    </Flex>
                    <Spacer />
                    <AspectRatio
                      height="100%"
                      width="100%"
                      maxW="175px"
                      ratio={2 / 3}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${selectedMovie?.poster_path}`}
                        alt={selectedMovie?.original_title}
                        fallbackSrc="https://via.placeholder.com/140x220?text=Not%20Found"
                        objectFit="cover"
                      />
                    </AspectRatio>
                  </Flex>
                </Flex>
              </Flex>
              <AspectRatio
                maxH="300px"
                minW="120%"
                ml="-20%"
                pos="relative"
                _after={{
                  content: '""',
                  bgSize: "cover",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pos: "absolute",
                  bg: "linear-gradient(120deg, transparent, black)",
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path}`}
                  fallbackSrc="https://via.placeholder.com/1024x300?text=Backdrop%20Poster%20Not%20Found"
                  alt={selectedMovie?.original_title}
                  objectPosition="0 25%"
                  objectFit="cover"
                />
              </AspectRatio>
              <Text pt={24}>{selectedMovie?.overview}</Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>setSelectedMovie(undefined)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
