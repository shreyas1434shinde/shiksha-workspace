import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../../components/Layout";
import { Typography, Box, TablePagination } from "@mui/material";
import CourseCard from "../../../../components/CourseCard";
import SearchBox from "../../../../components/SearchBox";
import { getContent } from "@/services/ContentService";
import Loader from "@/components/Loader";
import NoDataFound from "@/components/NoDataFound";
import PaginationComponent from "@/components/PaginationComponent";
import { LIMIT } from "@/utils/app.constant";

const DraftPage = () => {
  const [selectedKey, setSelectedKey] = useState("draft");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("updated");
  const [contentList, setContentList] = React.useState<content[]>([]);
  const [contentDeleted, setContentDeleted] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSearch = (search: string) => {
    setSearchTerm(search.toLowerCase());
  };

  const handleFilterChange = (filter: string[]) => {
    setFilter(filter);
  };

  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const filteredData = useMemo(
    () =>
      contentList?.filter((content) =>
        content.name.toLowerCase().includes(searchTerm)
      ),
    [searchTerm]
  );

  // const displayedCards = filteredData?.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  const handleDelete = (index: number) => {
    console.log(`Deleting item at index ${index}`);
    setTimeout(() => {
      setContentDeleted((prev) => !prev);
    }, 1000);
  };

  useEffect(() => {
    const getDraftContentList = async () => {
      try {
        setLoading(true);
        const query = debouncedSearchTerm || "";
        const offset = page * LIMIT;
        const primaryCategory = filter.length ? filter : [];
        const order = sortBy === "Modified On" ? "desc" : "asc";
        const sort_by = {
          lastUpdatedOn: order,
        };
        const response = await getContent(
          ["Draft", "FlagDraft"],
          query,
          LIMIT,
          offset,
          primaryCategory,
          sort_by
        );
        const contentList = (response?.content || []).concat(
          response?.QuestionSet || []
        );
        setContentList(contentList);
        setTotalCount(response?.count);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getDraftContentList();
  }, [debouncedSearchTerm, filter, sortBy, contentDeleted, page]);

  return (
    <Layout selectedKey={selectedKey} onSelect={setSelectedKey}>
      <Box p={3}>
        <Typography variant="h4">Draft Content</Typography>
        <Typography mb={2}>Here you see all your draft content.</Typography>

        <Box mb={3}>
          <SearchBox
            placeholder="Search by title..."
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </Box>

        <Box display="flex" flexWrap="wrap" gap={3}>
          {loading ? (
            <Loader showBackdrop={true} loadingText={"Loading"} />
          ) : contentList && contentList.length > 0 ? (
            contentList?.map((content, index) => (
              <Box
                key={content?.identifier}
                sx={{
                  minWidth: "250px",
                  maxWidth: "250px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CourseCard
                  title={content?.name}
                  description={content?.description}
                  type={content?.primaryCategory}
                  imageUrl={content.appIcon}
                  status={content.status}
                  identifier={content?.identifier}
                  mimeType={content?.mimeType}
                  onDelete={() => handleDelete(index)}
                />
              </Box>
            ))
          ) : (
            <NoDataFound />
          )}
        </Box>
        {totalCount > LIMIT && (
          <PaginationComponent
            count={Math.ceil(totalCount / LIMIT)}
            page={page}
            onPageChange={handleChangePage}
          />
        )}
      </Box>
    </Layout>
  );
};

export default DraftPage;
