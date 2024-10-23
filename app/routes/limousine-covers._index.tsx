import { StaticContentProvider } from '~/components/common/StaticContentProvider';
import { Breadcrumbs } from '~/components/limousine/Breadcrumbs';
import { CategoryStaticContent } from '~/components/limousine/CategoryStaticContent';

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
