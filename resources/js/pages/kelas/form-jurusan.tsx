import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import jurusan from '@/routes/jurusan';
import type { dataJurusanType } from '@/types';
type FormJurusanProps = {
    onSuccess: () => void;
    dataJurusan?: dataJurusanType;
    type: 'create' | 'update';
};

export default function FormJurusan({
    onSuccess,
    dataJurusan,
    type,
}: FormJurusanProps) {
    const { data, setData, post, errors, reset, processing } = useForm({
        jurusan: dataJurusan?.jurusan ?? '',
        kode_jurusan: dataJurusan?.kode_jurusan ?? '',
    });
    const handleSubmit = () => {
        const options = {
            onSuccess: () => {
                reset();
                onSuccess();
            },
        };

        if (type === 'create') {
            post(jurusan.store().url, options);
        } else if (type === 'update') {
            post(jurusan.update(dataJurusan?.id ?? '-').url, options);
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <FieldGroup>
                <Field>
                    <FieldLabel>Jurusan</FieldLabel>
                    {errors.jurusan && (
                        <FieldError>{errors.jurusan}</FieldError>
                    )}
                    <Input
                        value={data.jurusan}
                        onChange={(e) => setData('jurusan', e.target.value)}
                        placeholder="Cth: Matematika"
                    />
                </Field>
                <Field>
                    <FieldLabel>Singkatan</FieldLabel>
                    {errors.kode_jurusan && (
                        <FieldError>{errors.kode_jurusan}</FieldError>
                    )}
                    <Input
                        value={data.kode_jurusan}
                        onChange={(e) =>
                            setData('kode_jurusan', e.target.value)
                        }
                        placeholder="Cth: MTK"
                    />
                </Field>
                <div className="flex justify-end">
                    <Button type="submit" disabled={processing}>
                        Submit
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
}
