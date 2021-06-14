import { nanoid } from 'nanoid';
import { supabase } from 'libs/clients/supabase';

export const createProject = async ({
  name = 'default',
  pallets,
  userID,
  urlKey = null,
  onSuccess = () => {},
}) => {
  try {
    const url = urlKey ? urlKey : nanoid();
    const { data, error } = await supabase
      .from('projects')
      .insert([{ name, pallets, user_id: userID, url }]);
    if (data) {
      onSuccess(data);
      return { data, error };
    }
    return { data, error };
  } catch (error) {
    console.log({ error });
    return { data: null, error };
  }
};

export const getProjectDetails = async (url) => {
  try {
    let { data, error, status } = await supabase
      .from('projects')
      .select('*')
      .eq('url', url)
      .single();

    if (error && status !== 406) {
      throw error;
    }
    return { data, error, status };
  } catch (error) {
    return { data: null, error };
  }
};

export const getMyProjectsList = async (user_id, start, limit = 9) => {
  try {
    let { data, error } = await supabase
      .from('projects')
      .select('*')
      .match({ user_id })
      .order('updated_at', { ascending: false })
      .range(start, limit);

    if (error) {
      throw error;
    }
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const updateProjectDetails = async ({
  name,
  pallets,
  id,
  onSuccess = () => {},
}) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update([{ name, pallets }])
      .eq('id', id);

    if (data) {
      onSuccess(data);
      return { data, error };
    }
    return { data, error };
  } catch (error) {
    console.log({ error });
    return { data: null, error };
  }
};

export const deleteProjectDetails = async ({ id, onSuccess = () => {} }) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .delete()
      .match({ id });

    if (data) {
      onSuccess(data);
      return { data, error };
    }
    return { data, error };
  } catch (error) {
    console.log({ error });
    return { data: null, error };
  }
};
