import { Box, Card, Heading, Link as ChakraLink, Stack } from "@chakra-ui/react"
import { articleClient } from "api"
import { useFetch } from "utils/http"
import { EmptyArticleList } from "./EmptyArticleList"
import { MarkdownViewer } from "modules/markdown"
import { Skeleton } from "components/ui/skeleton"
import { Link } from "shared/Router"

const BrowsePage = () => {
  const {
    data: articles,
    loading,
    error,
  } = useFetch(() => articleClient.fetchForUser())

  if (loading) {
    return <Skeleton />
  }

  if (articles === null || articles.length === 0) {
    return <EmptyArticleList />
  }

  return (
    <Box width="100%">
      <Stack>
        {articles
          .toSorted((a, b) => (a.createdAt.isBefore(b.createdAt) ? 1 : -1))
          .map((a) => {
            const lines = a.content.trim().split("\n")
            const heading =
              lines.length > 0 ? lines[0].replaceAll("#", "").trim() : a.title
            return (
              <Card.Root key={a.id} size="sm">
                <Card.Header>
                  <ChakraLink asChild>
                    <Link to={`/articles/${a.id}`}>
                      <Heading size="md">{heading}</Heading>
                    </Link>
                  </ChakraLink>
                </Card.Header>
                <Card.Body color="fg.muted">
                  <MarkdownViewer
                    text={lines
                      .filter((line) => line.trim().length > 0)
                      .slice(1, 4)
                      .join("\n")}
                  />
                </Card.Body>
              </Card.Root>
            )
          })}
      </Stack>
    </Box>
  )
}

export const Component = BrowsePage
