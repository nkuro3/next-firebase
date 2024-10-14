"use client";

import { Edit } from "lucide-react";
import { Alert } from "@/components/common/alert";
import MyFeeds from "@/components/features/profile/my-feeds";
import EditUserForm from "@/components/forms/edit-user-form";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/use-profile";
import dayjs from "@/lib/utils/dayjs";
import styles from "./styles/profile.module.css";

const Profile = () => {
  const {
    isOpenEditUser,
    setIsOpenEditUser,
    user,
    alertState,
    register,
    handler,
    errors,
    pending,
    previewImage,
    handleImageChange,
    handlerCloseEditUser
  } = useProfile();
  const editUserProps = { register, handler, errors, pending, previewImage, handleImageChange };

  return (
    <div>
      {user && (
        <>
          <div className={styles.profileContainer}>
            <div className={styles.editButtonContainer}>
              <Button variant="none" size="icon" onClick={() => setIsOpenEditUser(true)}>
                <Edit color="#aaa" size={26} />
              </Button>
            </div>
            <div className={styles.profileHeader}>
              <img src={user.imageUrl} alt="profile image" width={80} height={80} className={styles.avatar} />
              <div className={styles.username}>{user.username}</div>
            </div>
            <div className={styles.profileDetailsContainer}>
              <h4 className={styles.profileTitle}>プロフィール</h4>
              <div className={styles.profileDetails}>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>メールアドレス</div>
                  <div className={styles.detailValue}>{user.email}</div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>性別</div>
                  <div className={styles.detailValue}>
                    {user.gender === "male" ? "男性" : user.gender === "female" ? "女性" : "その他"}
                  </div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>誕生日</div>
                  <div className={styles.detailValue}>{dayjs(user.birth).format("YYYY年MM月DD日")}</div>
                </div>
              </div>
              {isOpenEditUser && (
                <div className={styles.editUserOverlay}>
                  <div className={styles.editUserModal}>
                    <Alert {...alertState} />
                    <EditUserForm onCancel={handlerCloseEditUser} {...editUserProps} />
                  </div>
                </div>
              )}
            </div>
            <div className={styles.pastFeedsHeader}>Past Feeds</div>
          </div>
          <MyFeeds uid={user.uid} />
        </>
      )}
    </div>
  );
};

export default Profile;
