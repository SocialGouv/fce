import { staticAttributeActions } from './permissonsConstantsActions';

const generateContentTypeActions = (
  subjectPermissions,
  existingContentTypeActions,
  permissionsLayout,
  shouldAddDeleteAction = false
) => {
  const additionalActions = Object.entries(existingContentTypeActions).reduce((acc, current) => {
    if (current[1] && !staticAttributeActions.includes(current[0])) {
      return { ...acc, [current[0]]: current[1] };
    }

    return acc;
  }, {});

  const actions = Array.from(
    new Set(
      Object.values(subjectPermissions).reduce((acc, current) => {
        return [...acc, ...current.actions];
      }, [])
    )
  );

  const generatedContentTypeActions = actions.reduce(
    (acc, current) => ({
      ...acc,
      [current]: true,
    }),
    {}
  );

  const layoutAttributeActions = permissionsLayout
    .filter(perm => !staticAttributeActions.includes(perm.action))
    .reduce((acc, current) => {
      return { ...acc, [current.action]: true };
    }, {});

  if (shouldAddDeleteAction) {
    return {
      ...generatedContentTypeActions,
      ...additionalActions,
      ...layoutAttributeActions,
    };
  }

  return {
    ...generatedContentTypeActions,
    ...additionalActions,
  };
};

export default generateContentTypeActions;
