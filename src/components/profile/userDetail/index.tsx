
import { Card, CardContent, CardFooter } from '../../ui/Card';
import { Button, Input } from '../../ui';
import useUserDetail from './hooks/useUserDetail';

const UserDetail = () => {
   
    const {t, formData, handleInputChange, updateUserDetail} = useUserDetail();
   
    return (
        <div className="grid gap-6">
            <div className="grid gap-2">
                <h1 className="text-3xl font-bold">{t("profile.title")}</h1>
                <p className="text-muted-foreground">{t("profile.update_your_personal_information")}</p>
            </div>
            <Card>
                <CardContent className="grid gap-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Input
                                label={t("auth.name")}
                                onChange={handleInputChange}
                                name="name"
                                value={formData.name}
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                label={t("auth.email")}
                                onChange={() => {}}
                                id="email"
                                type="email"
                                value={formData.email}
                                disabled
                                className="opacity-80 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                    <Button variant="danger-outline">{t("common.cancel")}</Button>
                    <Button onClick={updateUserDetail}>{t("common.save")}</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default UserDetail;
