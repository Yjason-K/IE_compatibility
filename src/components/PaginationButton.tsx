import {Table} from "@tanstack/react-table";
import {Button} from "@chakra-ui/react";
import {useState} from 'react';

interface PeopleData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  dob: string;
}

interface PaginationControlsProps {
  table: Table<PeopleData>;
}

export const PaginationControls = ({ table }: PaginationControlsProps) => {
  const [pageIndex, setPageIndex] = useState(0); // 초기 페이지 인덱스

  const goToPage = (pageIndex: number) => {
    table.setPageIndex(pageIndex);
  };

  const handlePageUnitChange = (unit: number) => {
    const nextPageIndex = pageIndex + (unit * 5); // 5페이지씩 이동
    // 새 페이지 인덱스가 유효한 범위 내에 있는지 확인
    if (nextPageIndex >= 0 && nextPageIndex < table.getPageCount()) {
      setPageIndex(nextPageIndex);
    } else if (nextPageIndex < 0) {
      setPageIndex(0); // 가장 첫 페이지로 설정
    } else if (nextPageIndex >= table.getPageCount()) {
      setPageIndex(table.getPageCount() - 1); // 가장 마지막 페이지로 설정
    }
  };


  // 페이지 버튼 렌더링 함수
  const renderPageButtons = () => {
    const pageButtons = [];
    const pageCount = table.getPageCount();
    const pageButtonLimit = 5; // 한 번에 보여줄 최대 페이지 버튼 수
    let startPageIndex = pageIndex - Math.floor(pageButtonLimit / 2);
    startPageIndex = Math.max(startPageIndex, 0); // 시작 페이지 인덱스가 음수가 되지 않도록 함
    let endPageIndex = startPageIndex + pageButtonLimit - 1;
    if (endPageIndex >= pageCount) {
      endPageIndex = pageCount - 1;
      startPageIndex = Math.max(endPageIndex - pageButtonLimit + 1, 0); // 끝 페이지에서 시작 페이지를 역산할 때 음수가 되지 않도록 함
    }

    for (let i = startPageIndex; i <= endPageIndex; i++) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => goToPage(i)}
          disabled={pageIndex === i}
        >
          {i + 1}
        </Button>
      );
    }
    return pageButtons;
  };



  return (
    <div>
      <Button onClick={() => handlePageUnitChange(-1)} disabled={pageIndex === 0}>
        {'<'}
      </Button>
      {renderPageButtons()}
      <Button onClick={() => handlePageUnitChange(1)} disabled={pageIndex === table.getPageCount() - 1}>
        {'>'}
      </Button>
    </div>
  );
}
