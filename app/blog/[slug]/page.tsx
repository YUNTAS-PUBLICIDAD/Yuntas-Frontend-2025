import { BlogData } from "@/data/blog/blogData";
import HeroPage from "@/components/molecules/HeroPage";
import DescripcionSection from "@/components/organisms/blog/blogId/DescripcionSection";
import BeneficiosSection from "@/components/organisms/blog/blogId/BeneficiosSection";
import OpinionSection from "@/components/organisms/blog/blogId/OpinionSection";
import VideoSection from "@/components/organisms/blog/blogId/VideoSection";
export default function BlogDetallePage({ params }: { params: { slug: string } }) {
  const Data = BlogData.find(e => e.id === params.slug);
  if(Data===undefined) return
  return (
    <main className="">
      <HeroPage url={Data?.fondoPrincipal} text={Data.nombre} position="medio"/>
      <DescripcionSection data={Data}/>
      <BeneficiosSection data={Data}/>
      <OpinionSection data={Data}/>
      <VideoSection data={Data}/>
    </main>
  );
}
