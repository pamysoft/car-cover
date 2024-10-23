import { StaticContentProvider } from '~/components/common/StaticContentProvider';
import { Breadcrumbs } from '~/components/scooters/Breadcrumbs';
import { CategoryStaticContent } from '~/components/scooters/CategoryStaticContent';

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
