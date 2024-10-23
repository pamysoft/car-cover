import { StaticContentProvider } from '~/components/common/StaticContentProvider';
import { Breadcrumbs } from '~/components/hearse/Breadcrumbs';
import { CategoryStaticContent } from '~/components/hearse/CategoryStaticContent';

export default function () {

  return (
    <StaticContentProvider>
      <Breadcrumbs.Provider>
        <Breadcrumbs />
        <CategoryStaticContent />
      </Breadcrumbs.Provider>
    </StaticContentProvider>
  );
}
