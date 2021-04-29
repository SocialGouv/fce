import React, { useState, useEffect, useMemo, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { cloneDeep, findIndex, get, isArray, isEmpty, set } from 'lodash';
import { request } from 'strapi-helper-plugin';
import { Flex, Text, Padded } from '@buffetjs/core';
import pluginId from '../../pluginId';
import useDataManager from '../../hooks/useDataManager';
import useEditView from '../../hooks/useEditView';
import { getFieldName } from '../../utils';
import NotAllowedInput from '../NotAllowedInput';
import SelectOne from '../SelectOne';
import SelectMany from '../SelectMany';
import ClearIndicator from './ClearIndicator';
import DropdownIndicator from './DropdownIndicator';
import IndicatorSeparator from './IndicatorSeparator';
import Option from './Option';
import { A, BaselineAlignment } from './components';
import { connect, select, styles } from './utils';

function SelectWrapper({
  componentUid,
  description,
  displayNavigationLink,
  editable,
  label,
  isCreatingEntry,
  isFieldAllowed,
  isFieldReadable,
  mainField,
  name,
  relationType,
  slug,
  targetModel,
  placeholder,
}) {
  // Disable the input in case of a polymorphic relation
  const isMorph = relationType.toLowerCase().includes('morph');
  const { addRelation, modifiedData, moveRelation, onChange, onRemoveRelation } = useDataManager();

  const { isDraggingComponent } = useEditView();

  // This is needed for making requests when used in a component
  const fieldName = useMemo(() => {
    const fieldNameArray = getFieldName(name);

    return fieldNameArray[fieldNameArray.length - 1];
  }, [name]);

  const { pathname } = useLocation();

  const value = get(modifiedData, name, null);
  const [state, setState] = useState({
    _contains: '',
    _limit: 20,
    _start: 0,
  });
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const abortController = new AbortController();
  const { signal } = abortController;
  const ref = useRef();
  const startRef = useRef();

  const filteredOptions = useMemo(() => {
    return options.filter(option => {
      if (!isEmpty(value)) {
        // SelectMany
        if (Array.isArray(value)) {
          return findIndex(value, o => o.id === option.value.id) === -1;
        }

        // SelectOne
        return get(value, 'id', '') !== option.value.id;
      }

      return true;
    });
  }, [options, value]);

  startRef.current = state._start;

  ref.current = async () => {
    if (isMorph) {
      setIsLoading(false);

      return;
    }

    if (!isDraggingComponent) {
      try {
        const requestUrl = `/${pluginId}/explorer/${slug}/relation-list/${fieldName}`;

        const containsKey = `${mainField}_contains`;
        const { _contains, ...restState } = cloneDeep(state);
        const params = isEmpty(state._contains)
          ? restState
          : { [containsKey]: _contains, ...restState };

        if (componentUid) {
          set(params, '_component', componentUid);
        }

        const data = await request(requestUrl, {
          method: 'GET',
          params,
          signal,
        });

        const formattedData = data.map(obj => {
          return { value: obj, label: obj[mainField] };
        });

        setOptions(prevState =>
          prevState.concat(formattedData).filter((obj, index) => {
            const objIndex = prevState.findIndex(el => el.value.id === obj.value.id);

            if (objIndex === -1) {
              return true;
            }

            return prevState.findIndex(el => el.value.id === obj.value.id) === index;
          })
        );
        setIsLoading(false);
      } catch (err) {
        if (err.code !== 20) {
          strapi.notification.error('notification.error');
        }
      }
    }
  };

  useEffect(() => {
    if (state._contains !== '') {
      let timer = setTimeout(() => {
        ref.current();
      }, 300);

      return () => clearTimeout(timer);
    }

    if (isFieldAllowed) {
      ref.current();
    } else {
      setIsLoading(false);
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state._contains, isFieldAllowed]);

  useEffect(() => {
    if (state._start !== 0) {
      ref.current();
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state._start]);

  const onInputChange = (inputValue, { action }) => {
    if (action === 'input-change') {
      setState(prevState => {
        if (prevState._contains === inputValue) {
          return prevState;
        }

        return { ...prevState, _contains: inputValue, _start: 0 };
      });
    }

    return inputValue;
  };

  const onMenuScrollToBottom = () => {
    setState(prevState => ({ ...prevState, _start: prevState._start + 20 }));
  };

  const isSingle = ['oneWay', 'oneToOne', 'manyToOne', 'oneToManyMorph', 'oneToOneMorph'].includes(
    relationType
  );

  const to = `/plugins/${pluginId}/collectionType/${targetModel}/${value ? value.id : null}`;

  const link = useMemo(() => {
    if (!value) {
      return null;
    }

    if (!displayNavigationLink) {
      return null;
    }

    return (
      <Link to={{ pathname: to, state: { from: pathname } }}>
        <FormattedMessage id="content-manager.containers.Edit.seeDetails">
          {msg => <A color="mediumBlue">{msg}</A>}
        </FormattedMessage>
      </Link>
    );
  }, [displayNavigationLink, pathname, to, value]);

  const Component = isSingle ? SelectOne : SelectMany;
  const associationsLength = isArray(value) ? value.length : 0;

  const isDisabled = useMemo(() => {
    if (isMorph) {
      return true;
    }

    if (!isCreatingEntry) {
      return (!isFieldAllowed && isFieldReadable) || !editable;
    }

    return !editable;
  }, [isMorph, isCreatingEntry, editable, isFieldAllowed, isFieldReadable]);

  if (!isFieldAllowed && isCreatingEntry) {
    return <NotAllowedInput label={label} />;
  }

  if (!isCreatingEntry && !isFieldAllowed && !isFieldReadable) {
    return <NotAllowedInput label={label} />;
  }

  return (
    <Padded>
      <BaselineAlignment />
      <Flex justifyContent="space-between">
        <Text fontWeight="semiBold">
          {label}
          {!isSingle && ` (${associationsLength})`}
        </Text>
        {isSingle && link}
      </Flex>
      {!isEmpty(description) && (
        <Padded top size="xs">
          <BaselineAlignment />
          <Text fontSize="sm" color="grey" lineHeight="12px" ellipsis>
            {description}
          </Text>
        </Padded>
      )}
      <Padded top size="sm">
        <BaselineAlignment />

        <Component
          addRelation={value => {
            addRelation({ target: { name, value } });
          }}
          components={{ ClearIndicator, DropdownIndicator, IndicatorSeparator, Option }}
          displayNavigationLink={displayNavigationLink}
          id={name}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable
          mainField={mainField}
          move={moveRelation}
          name={name}
          options={filteredOptions}
          onChange={value => {
            onChange({ target: { name, value: value ? value.value : value } });
          }}
          onInputChange={onInputChange}
          onMenuClose={() => {
            setState(prevState => ({ ...prevState, _contains: '' }));
          }}
          onMenuScrollToBottom={onMenuScrollToBottom}
          onRemove={onRemoveRelation}
          placeholder={
            isEmpty(placeholder) ? (
              <FormattedMessage id={`${pluginId}.containers.Edit.addAnItem`} />
            ) : (
              placeholder
            )
          }
          styles={styles}
          targetModel={targetModel}
          value={value}
        />
      </Padded>
      <div style={{ marginBottom: 28 }} />
    </Padded>
  );
}

SelectWrapper.defaultProps = {
  componentUid: null,
  editable: true,
  description: '',
  label: '',
  isFieldAllowed: true,
  placeholder: '',
};

SelectWrapper.propTypes = {
  componentUid: PropTypes.string,
  displayNavigationLink: PropTypes.bool.isRequired,
  editable: PropTypes.bool,
  description: PropTypes.string,
  label: PropTypes.string,
  isCreatingEntry: PropTypes.bool.isRequired,
  isFieldAllowed: PropTypes.bool,
  isFieldReadable: PropTypes.bool.isRequired,
  mainField: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  relationType: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  targetModel: PropTypes.string.isRequired,
};

const Memoized = memo(SelectWrapper);

export default connect(Memoized, select);
