export interface School {
    school_code: string;
    school_name: string;
    school_locate_at: string;
    school_type_code: string;
    school_type: string;
    zip_code: string;
    pref_code: string;
    pref: string;
    school_status_code: string;
    school_status: string;
    school_founder_code: string;
    school_founder: string;
    obsolete_school_code: string;
    school_code_unique: string;
    updated_at: string;
  }

  export interface SchoolQueryParams {
    school_type_code?: string;
    page?: number;
    // 他の可能なクエリパラメータをここに追加
  }

  export interface PaginationInfo {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    firstPageUrl: string | null;
    nextPageUrl: string | null;
    lastPageUrl: string | null;
  }

  export interface SchoolsResponse {
    schools: School[];
    paginationInfo: PaginationInfo;
  }