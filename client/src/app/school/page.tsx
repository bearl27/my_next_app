'use client';

import { useState, useEffect } from 'react';
import { getSchools } from '@/lib/api';
import { School, SchoolsResponse, SchoolQueryParams } from '@/types/school';

export default function SchoolPage() {
  const [schoolsData, setSchoolsData] = useState<SchoolsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  async function loadSchools(page: number) {
    try {
      const params: SchoolQueryParams = {
        school_type_code: 'F1',
        page: page
      };
      const data = await getSchools(params);
      setSchoolsData(data);
      setError(null);
    } catch (e) {
      console.error('Error details:', e);
      setError(e instanceof Error ? e.message : '未知のエラーが発生しました');
    }
  }

  useEffect(() => {
    loadSchools(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1>学校一覧</h1>
      {error ? (
        <p>エラー: {error}</p>
      ) : schoolsData ? (
        <>
          <ul>
            {schoolsData.schools.map((school) => (
              <li key={school.school_code}>
                {school.school_name} - {school.school_type} ({school.pref})
              </li>
            ))}
          </ul>
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              前へ
            </button>
            <span>
              {schoolsData.paginationInfo.currentPage} / {schoolsData.paginationInfo.lastPage} ページ
              (全 {schoolsData.paginationInfo.total} 件)
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === schoolsData.paginationInfo.lastPage}
            >
              次へ
            </button>
          </div>
        </>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
}