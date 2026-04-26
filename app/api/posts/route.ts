import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const qualification = searchParams.get('qualification')?.toLowerCase() || '';
    const region = searchParams.get('region')?.toLowerCase() || '';
    const sort = searchParams.get('sort') || 'none';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Enforce maximum limit to prevent data scraping
    const MAX_LIMIT = 50;
    if (limit > MAX_LIMIT) {
      return NextResponse.json(
        { error: `Limit cannot exceed ${MAX_LIMIT}. Please use pagination to fetch more data.` },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'data', 'ssc_posts_full.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    let filteredData = data;

    if (search) {
      filteredData = filteredData.filter((post: any) =>
        post.postName.toLowerCase().includes(search) ||
        post.jobRequirements.toLowerCase().includes(search)
      );
    }

    if (qualification) {
      filteredData = filteredData.filter((post: any) =>
        post.qualificationDescriptions.some((q: string) =>
          q.toLowerCase().includes(qualification)
        )
      );
    }

    if (region) {
      filteredData = filteredData.filter((post: any) =>
        post.regionId.toLowerCase().includes(region)
      );
    }

    if (sort === 'high-to-low') {
      filteredData = filteredData.sort((a: any, b: any) => b.vacancy.TOTAL - a.vacancy.TOTAL);
    } else if (sort === 'low-to-high') {
      filteredData = filteredData.sort((a: any, b: any) => a.vacancy.TOTAL - b.vacancy.TOTAL);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedData,
      total: filteredData.length,
      page,
      limit,
      totalPages: Math.ceil(filteredData.length / limit),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load posts data' }, { status: 500 });
  }
}
