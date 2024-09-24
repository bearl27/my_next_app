import https from 'https';
import { School, SchoolQueryParams, SchoolsResponse, PaginationInfo } from '../types/school';

const API_BASE_URL = 'https://api.edu-data.jp/api/v1/school';
const API_TOKEN = process.env.API_TOKEN;

if (!API_TOKEN) {
  throw new Error('API_TOKEN is not set in environment variables');
}

function httpsRequest(url: string, options: https.RequestOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP status code: ${res.statusCode}, body: ${data}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

export async function getSchools(params: SchoolQueryParams = {}): Promise<SchoolsResponse> {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) queryParams.append(key, value.toString());
  });

  if (!params.school_type_code) {
    queryParams.append('school_type_code', 'F1');
  }

  const url = `${API_BASE_URL}?${queryParams.toString()}`;

  try {
    const options: https.RequestOptions = {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept': 'application/json'
      }
    };

    const responseData = await httpsRequest(url, options);
    const data = JSON.parse(responseData);

    console.log('API response:', JSON.stringify(data)); // デバッグ用

    if (data.schools && Array.isArray(data.schools.data)) {
      const paginationInfo: PaginationInfo = {
        currentPage: data.schools.current_page,
        lastPage: data.schools.last_page,
        perPage: data.schools.per_page,
        total: data.schools.total,
        firstPageUrl: data.schools.first_page_url,
        nextPageUrl: data.schools.next_page_url,
        lastPageUrl: data.schools.last_page_url,
      };

      return {
        schools: data.schools.data,
        paginationInfo: paginationInfo,
      };
    } else {
      console.error('Unexpected data structure:', data);
      return {
        schools: [],
        paginationInfo: {
          currentPage: 1,
          lastPage: 1,
          perPage: 100,
          total: 0,
          firstPageUrl: null,
          nextPageUrl: null,
          lastPageUrl: null,
        },
      };
    }
  } catch (error) {
    console.error('Error fetching schools:', error);
    throw error;
  }
}