import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.less';
import { Input } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { ObsidianBackendServiceConfig } from './interface';

interface FormProps extends FormComponentProps {
  verified?: boolean;
  info?: ObsidianBackendServiceConfig;
}

const ConfigForm: React.FC<FormProps> = ({ form: { getFieldDecorator }, info, verified }) => {
  const disabled = verified || !!info;

  return (
    <Fragment>
      <Form.Item
        label={
          <FormattedMessage id="backend.services.obsidian.valutName" defaultMessage="valutName" />
        }
      >
        {getFieldDecorator('valutName', {
          initialValue: info?.valutName,
          rules: [
            {
              required: true,
              message: (
                <FormattedMessage
                  id="backend.services.obsidian.valutName.message"
                  defaultMessage="please enter valut name"
                />
              ),
            },
          ],
        })(<Input disabled={disabled} />)}
      </Form.Item>
      <Form.Item
        label={
          <FormattedMessage
            id="backend.services.obsidian.saveDirectory"
            defaultMessage="Save Directory"
          />
        }
      >
        {getFieldDecorator('directory', {
          initialValue: info?.directory,
        })(<Input />)}
      </Form.Item>
    </Fragment>
  );
};

export default ConfigForm;
