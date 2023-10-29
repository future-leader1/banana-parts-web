import LanguageChange from 'src/components/LanguageChange';
import { LanguageLabel } from 'src/components/LanguageChange';
export default function LanguageButtonLayout({
  children,
  Currentlanguage,
}: {
  children: React.ReactNode;
  Currentlanguage: LanguageLabel;
}): JSX.Element {
  return (
    <>
      <LanguageChange Currentlanguage={Currentlanguage} />
      <main>{children}</main>
    </>
  );
}
