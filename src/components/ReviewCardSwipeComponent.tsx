import Image from 'next/image';

interface Review {
    tag: string;
    companyName: string;
    name: string;
    reviewContent: string;
    logoImg: string;
}

interface ReviewCardSwipeProps {
    Review: Review;
}

export const ReviewCardSwipeComponent: React.FC<ReviewCardSwipeProps> = ({
    Review,
}) => {

    return (
        <div className="m-2 pb-10 drop-shadow-md hover:drop-shadow-lg">
            <div className="h-84 relative w-full  rounded-2xl border bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col  justify-between">
                        <div className="mb-2 flex max-w-fit rounded-lg bg-[#FFF9E7] p-2 text-[#FFCB12] font-semibold">
                            {Review.tag}
                        </div>
                        <div className='flex flex-row items-center'>
                            <div className="mr-4 rounded-2xl w-14 h-14">
                            <Image
                    src={Review.logoImg || '/#'}
                    alt="reviewer Image"
                    layout="intrinsic"
                    height='100%'
                    width='100%'
                    objectFit='contain'
                    className="rounded-circle"
                  />
                            </div>
                            <div>
                                <p className='text-gray-500 text-16 font-semibold line-clamp-1'>{Review.companyName}</p>
                                <p className="text-[28px] font-bold break-all line-clamp-1">
                                    {Review.name}
                                </p>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="mt-5">
                    <div>
                        <div className="flex">
                            <div className=" text-gray-500 text-16 text-regular line-clamp-5">
                                {Review.reviewContent}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
