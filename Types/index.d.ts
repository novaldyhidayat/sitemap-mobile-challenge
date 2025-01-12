export interface News {
    title: string;
    description: string;
    urlToImage: string;
    content: string;
    publishedAt: Date;
    url: string;
}

export interface CarouselProps {
    data: News[];
}

export interface NewsCardProps {
    news: News;
    onPress: (news: News) => void;
}

export interface SearchBarProps {
    onSearch: (text: string) => void;
}

export interface HomeScreenState {
    newsData: News[];
    filteredData: News[];
    loading: boolean;
    page: number;
    query: string;
    refreshing: boolean;
}

export type DateRange = {
    from: Date | null;
    to: Date | null;
};

export interface NewsDetailProps {
    route: {
        params: {
            news: News;
        };
    };
    navigation: any;
}