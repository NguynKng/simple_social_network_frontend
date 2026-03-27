import { useCallback, useEffect, useState } from "react";
import { userApi } from "../services/userApi";

export const useGetProfileBySlug = (slug) => {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const loadProfile = useCallback(async () => {
		if (!slug) {
			setProfile(null);
			setLoading(false);
			return;
		}

		try {
			setLoading(true);
			setError(null);

			const response = await userApi.getUserBySlug(slug);
			setProfile(response?.data || null);
		} catch (err) {
			setError(err.message || "Failed to fetch profile");
			setProfile(null);
		} finally {
			setLoading(false);
		}
	}, [slug]);

	useEffect(() => {
		loadProfile();
	}, [loadProfile]);

	return {
		profile,
		setProfile,
		loading,
		error,
		refreshProfile: loadProfile,
	};
};

export const useGetProfileByName = (name, options = {}) => {
  const [listUser, setListUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const shouldFetch = options.enabled !== false;
  useEffect(() => {
    if (!shouldFetch) return;
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await userApi.searchUsersByName(name);
        if (response.success) {
          setListUser(response.data.data);
          setError(null);
        } else {
          setError(response.message || "Lỗi không xác định");
        }
      } catch (err) {
        setError(err.message || "Lỗi khi gọi API");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [name, shouldFetch]);

  return { listUser, loading, error };
};
